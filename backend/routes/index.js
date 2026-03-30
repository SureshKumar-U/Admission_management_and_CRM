const router = require('express').Router();
const applicantRoutes = require("./applicants.routes")
const programRoutes = require("./program.routes")
const authRoutes = require("./auth.routes")
const dashboardRoutes = require("./dashboard.routes")
const allocationRoutes = require('./allocation.routes')

router.use('/auth',       authRoutes);
// router.use('/masters',    require('./master.routes'));
router.use('/programs',   programRoutes);
router.use('/applicants', applicantRoutes);
router.use('/allocation', allocationRoutes);
router.use('/dashboard',  dashboardRoutes);

module.exports = router;