const Applicant = require('../models/applicant.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

const applicantsControllers = {
    getAllApplicants: async (req, res, next) => {
        try {
            const { quota, status, docStatus, search, page = 1, limit = 20 } = req.query;
            const filter = {};
            if (quota) filter.quota = quota;
            if (status) filter.status = status;
            if (docStatus) filter.docStatus = docStatus;
            if (search) filter.$or = [
                { name: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') },
                { phone: new RegExp(search, 'i') },
            ];

            const [applicants, total] = await Promise.all([
                Applicant.find(filter)
                    .populate('program', 'name code courseType')
                    .skip((page - 1) * limit)
                    .limit(Number(limit))
                    .sort({ createdAt: -1 }),
                Applicant.countDocuments(filter),
            ]);

            res.json(new ApiResponse(200, { applicants, total, page: Number(page), pages: Math.ceil(total / limit) }));
        } catch (err) { next(err); }
    },
    updateApplicant: async (req, res, next) => {
        console.log(req.body)
        try {
            // Prevent overwriting confirmed status externally
            delete req.body.status;
            delete req.body.admissionNo;
            const applicant = await Applicant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            if (!applicant) throw new ApiError(404, 'Applicant not found');
            res.json(new ApiResponse(200, applicant));
        } catch (err) { next(err); }
    },
    createApplicant: async (req, res, next) => {
        try {
            const applicant = await Applicant.create({ ...req.body, createdBy: req.user._id });
            res.status(201).json(new ApiResponse(201, applicant, 'Applicant created'));
        } catch (err) { next(err); }
    }

}

module.exports = applicantsControllers








