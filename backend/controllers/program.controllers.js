;
const Program = require('../models/program.model');
const SeatMatrix = require('../models/seatmatrix.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

const ProgramControllers = {
    create: async (req, res, next) => {
        try {
            const program = await Program.create(req.body);
            res.status(201).json(new ApiResponse(201, program, 'Program created'));
        } catch (err) { next(err); }
    },
    getAll: async (req, res, next) => {
        try {
            const { departmentId, institutionId, courseType, academicYear } = req.query;
            const filter = {};
            if (departmentId) filter.department = departmentId;
            if (institutionId) filter.institution = institutionId;
            if (courseType) filter.courseType = courseType;
            if (academicYear) filter.academicYear = academicYear;

            const programs = await Program.find(filter)
                .populate('department', 'name code')
                .populate('institution', 'name code')
                .sort({ name: 1 });
            res.json(new ApiResponse(200, programs));
        } catch (err) { next(err); }
    },
    getOne: async (req, res, next) => {
        try {
            const program = await Program.findById(req.params.id)
                .populate('department', 'name code')
                .populate('institution', 'name code');
            if (!program) throw new ApiError(404, 'Program not found');
            res.json(new ApiResponse(200, program));
        } catch (err) { next(err); }
    },

    update: async (req, res, next) => {
        try {
            const program = await Program.findByIdAndUpdate(
                req.params.id, req.body, { returnDocument: 'after', runValidators: true }
            );
            if (!program) throw new ApiError(404, 'Program not found');
            res.json(new ApiResponse(200, program));
        } catch (err) { next(err); }
    }, remove: async (req, res, next) => {
        try {
            await Program.findByIdAndDelete(req.params.id);
            res.json(new ApiResponse(200, null, 'Program deleted'));
        } catch (err) { next(err); }
    },
    // Create seat matrix for a program
    createSeatMatrix: async (req, res, next) => {
        try {
            const program = await Program.findById(req.params.id);
            if (!program) throw new ApiError(404, 'Program not found');

            const { academicYear, quotas } = req.body;

            // Validate quota total = program intake
            const quotaSum = quotas.reduce((s, q) => s + q.total, 0);
            if (quotaSum !== program.totalIntake)
                throw new ApiError(400,
                    `Quota total (${quotaSum}) must equal program intake (${program.totalIntake})`
                );

            const existing = await SeatMatrix.findOne({ program: program._id, academicYear });
            if (existing) throw new ApiError(409, 'Seat matrix already exists for this academic year');

            const matrix = await SeatMatrix.create({
                program: program._id,
                academicYear,
                quotas,
                counters: {}
            });
            res.status(201).json(new ApiResponse(201, matrix, 'Seat matrix created'));
        } catch (err) { next(err); }
    },
    getSeatMatrix: async (req, res, next) => {
        try {
            const { academicYear } = req.query;
            const filter = { program: req.params.id };
            if (academicYear) filter.academicYear = academicYear;

            const matrix = await SeatMatrix.findOne(filter)
                .populate('program', 'name code totalIntake');
            if (!matrix) throw new ApiError(404, 'Seat matrix not found');
            res.json(new ApiResponse(200, matrix));
        } catch (err) { next(err); }
    },
     updateSeatMatrix: async (req, res, next) => {
        try {
            // Only allow updating quota totals (not filled — that's done atomically in allocation)
            const { quotas } = req.body;
            const program = await Program.findById(req.params.id);
            const quotaSum = quotas.reduce((s, q) => s + q.total, 0);
            if (quotaSum !== program.totalIntake)
                throw new ApiError(400,
                    `Quota total (${quotaSum}) must equal program intake (${program.totalIntake})`
                );

            const matrix = await SeatMatrix.findOneAndUpdate(
                { program: req.params.id },
                { $set: { quotas } },
                { returnDocument: 'after' }
            );
            if (!matrix) throw new ApiError(404, 'Seat matrix not found');
            res.json(new ApiResponse(200, matrix));
        } catch (err) { next(err); }
    }


}

module.exports = ProgramControllers
















