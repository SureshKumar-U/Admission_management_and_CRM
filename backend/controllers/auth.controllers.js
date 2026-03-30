const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const ApiError = require('../utils/apiError');
const ApiResponse = require('../utils/apiResponse');
const { JWT_SECRET, JWT_EXPIRES } = require('../config/env');

const signToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: JWT_EXPIRES });

const authController = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password) throw new ApiError(400, 'Email and password required');

            const user = await User.findOne({ email }).select('+password');
            if (!user || !(await user.comparePassword(password))) throw new ApiError(401, 'Invalid credentials');

            const token = signToken(user._id);
            res.json(new ApiResponse(200, { token, user: { id: user._id, name: user.name, role: user.role } }));
        } catch (err) { next(err); }
    },

    register: async (req, res, next) => {
        try {
            const { name, email, password, role } = req.body;
            if(!name || !email || !password ){
                 throw new ApiError(400, 'All fields are mandatory');

            }
            const exists = await User.findOne({ email });
            if (exists) throw new ApiError(409, 'Email already registered');
            const user = await User.create({ name, email, password, role });
            res.status(201).json(new ApiResponse(201, {
                id: user._id, name: user.name, email: user.email, role: user.role
            }, 'User created'));
        } catch (err) { next(err); }
    },
    getProfile: async (req, res, next) => {
        try {
            res.json(new ApiResponse(200, req.user));
        } catch (err) { next(err); }
    }

}

module.exports = authController

