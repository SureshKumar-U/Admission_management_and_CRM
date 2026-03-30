const Institution = require('../models/institution.model');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

const institutionController = {
    create: async (req, res, next) => {
        try {
            const institution = await Institution.create(req.body);
            res.status(201).json(new ApiResponse(201, institution, 'Institution created'));
        } catch (err) {
            next(err);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const institutions = await Institution.find().sort({ name: 1 });
            res.json(new ApiResponse(200, institutions));
        } catch (err) {
            next(err);
        }
    }
}

module.exports = institutionController

