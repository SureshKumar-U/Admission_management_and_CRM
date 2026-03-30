const jwt     = require('jsonwebtoken');
const User    = require('../models/user.model');
const ApiError = require('../utils/apiError');
const JWT_SECRET = process.env.JWT_SECRET

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new ApiError(401, 'Not authenticated');

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user || !req.user.isActive) throw new ApiError(401, 'User not found or inactive');

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { protect };