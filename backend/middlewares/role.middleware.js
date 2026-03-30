const ApiError = require('../utils/apiError');


const allowRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return next(new ApiError(403, `Role '${req.user?.role}' is not allowed`));
  }
  next();
};

module.exports = { allowRoles };