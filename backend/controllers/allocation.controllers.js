const mongoose = require('mongoose');
const SeatMatrix = require('../models/seatmatrix.model');
const Applicant = require('../models/applicant.model');
const Admission = require('../models/admission.model');
const Institution = require('../models/institution.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const { generateAdmissionNumber } = require('../utils/admissionNumber');


const allocationControllers = {
    confirmAdmission: async (req, res, next) => {
        // Use a MongoDB session for atomic seat decrement + admission creation
        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            const { applicantId } = req.params;

            const applicant = await Applicant.findById(applicantId)
                .populate('program')
                .session(session);
            if (!applicant) throw new ApiError(404, 'Applicant not found');
            if (applicant.status === 'Confirmed') throw new ApiError(400, 'Admission already confirmed');
            if (applicant.feeStatus !== 'Paid') throw new ApiError(400, 'Fee must be paid before confirming admission');
            if (applicant.docStatus !== 'Verified') throw new ApiError(400, 'Documents must be verified before confirming admission');

            // Atomically decrement the seat counter — only succeeds if remaining > 0
            const matrix = await SeatMatrix.findOneAndUpdate(
                {
                    program: applicant.program._id,
                    academicYear: applicant.academicYear,
                    quotas: {
                        $elemMatch: {
                            name: applicant.quota,
                            $expr: { $lt: ['$filled', '$total'] },  // filled < total
                        },
                    },
                },
                { $inc: { 'quotas.$.filled': 1 } },
                { new: true, session }
            );

            if (!matrix) throw new ApiError(409, `No seats available in ${applicant.quota} quota`);

            // Generate immutable admission number
            const institution = await Institution.findById(applicant.institution);
            const admissionNo = await generateAdmissionNumber(
                applicant.program,
                institution.code,
                applicant.quota,
                applicant.academicYear
            );

            // Create immutable Admission record
            const [admission] = await Admission.create([{
                admissionNo,
                applicant: applicant._id,
                program: applicant.program._id,
                institution: applicant.institution,
                quota: applicant.quota,
                academicYear: applicant.academicYear,
                confirmedBy: req.user._id,
            }], { session });

            // Update applicant status
            await Applicant.findByIdAndUpdate(
                applicantId,
                { status: 'Confirmed' },
                { session }
            );

            await session.commitTransaction();

            res.status(201).json(new ApiResponse(201, { admissionNo: admission.admissionNo }, 'Admission confirmed successfully'));
        } catch (err) {
            await session.abortTransaction();
            next(err);
        } finally {
            session.endSession();
        }
    },
    checkSeatAvailability: async (req, res, next) => {
        try {
            const { programId, quota, academicYear } = req.query;
            const matrix = await SeatMatrix.findOne({ program: programId, academicYear });
            if (!matrix) throw new ApiError(404, 'Seat matrix not found');

            const q = matrix.quotas.find(q => q.name === quota);
            if (!q) throw new ApiError(404, `Quota ${quota} not found`);

            res.json(new ApiResponse(200, {
                quota,
                total: q.total,
                filled: q.filled,
                remaining: q.total - q.filled,
                available: q.filled < q.total,
            }));
        } catch (err) { next(err); }
    },
    getAdmissions: async (req, res, next) => {
        try {
            const { academicYear, programId, quota, page = 1, limit = 20 } = req.query;
            const filter = {};
            if (academicYear) filter.academicYear = academicYear;
            if (programId) filter.program = programId;
            if (quota) filter.quota = quota;

            const [admissions, total] = await Promise.all([
                Admission.find(filter)
                    .populate('applicant', 'name email phone category')
                    .populate('program', 'name code courseType')
                    .populate('institution', 'name code')
                    .populate('confirmedBy', 'name')
                    .skip((page - 1) * limit)
                    .limit(Number(limit))
                    .sort({ confirmedAt: -1 }),
                Admission.countDocuments(filter),
            ]);

            res.json(new ApiResponse(200, {
                admissions, total,
                page: Number(page),
                pages: Math.ceil(total / limit),
            }));
        } catch (err) { next(err); }
    },
    getAdmissionByNo: async (req, res, next) => {
        try {
            const admission = await Admission.findOne({ admissionNo: req.params.admNo })
                .populate('applicant', 'name email phone category dob')
                .populate('program', 'name code courseType')
                .populate('institution', 'name code')
                .populate('confirmedBy', 'name');
            if (!admission) throw new ApiError(404, 'Admission not found');
            res.json(new ApiResponse(200, admission));
        } catch (err) { next(err); }
    }
}



module.exports= allocationControllers


