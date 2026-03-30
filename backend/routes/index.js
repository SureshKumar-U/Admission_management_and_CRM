const router = require('express').Router();
const applicantRoutes = require("./applicants.routes")
const programRoutes = require("./program.routes")
const authRoutes = require("./auth.routes")
const dashboardRoutes = require("./dashboard.routes")
const allocationRoutes = require('./allocation.routes')
const institutionRoutes = require('./institution.routes')
const departmentRoutes = require("./department.routes")

router.use('/auth',       authRoutes);
// router.use('/masters',    require('./master.routes'));
router.use('/programs',   programRoutes);
router.use('/applicants', applicantRoutes);
router.use('/allocations', allocationRoutes);
router.use('/dashboard',  dashboardRoutes);
router.use('/institutions',  institutionRoutes);
router.use('/departments',  departmentRoutes);

module.exports = router;