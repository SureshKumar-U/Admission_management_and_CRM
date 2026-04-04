const Department = require('../models/department.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');

const departmentControllers = {
    create: async (req, res, next) => {
        try {
            const dept = await Department.create(req.body);
            res.status(201).json(new ApiResponse(201, dept, 'Department created'));
        } catch (err) { next(err); }
    },
    getAll: async (req, res, next) => {
        try {
            const { institutionId } = req.query;
            const filter = institutionId ? { institution: institutionId } : {};
            const depts = await Department.find(filter)
                .populate('institution', 'name code')
                .sort({ name: 1 });
            res.json(new ApiResponse(200, depts));
        } catch (err) { next(err); }
    },
    getOne: async (req, res, next) => {
        try {
            const dept = await Department.findById(req.params.id)
                .populate('institution', 'name code');
            if (!dept) throw new ApiError(404, 'Department not found');
            res.json(new ApiResponse(200, dept));
        } catch (err) { next(err); }
    },
    update: async (req, res, next) => {
        try {
            const dept = await Department.findByIdAndUpdate(
                req.params.id, req.body, { returnDocument: 'after', runValidators: true }
            );
            if (!dept) throw new ApiError(404, 'Department not found');
            res.json(new ApiResponse(200, dept));
        } catch (err) { next(err); }
    },
    remove: async (req, res, next) => {
        try {
            await Department.findByIdAndDelete(req.params.id);
            res.json(new ApiResponse(200, null, 'Department deleted'));
        } catch (err) { next(err); }
    }
}



module.exports = departmentControllers



