const router = require('express').Router();


const Allocationctrl   = require('../controllers/allocation.controllers');
const { protect }    = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');



router.use(protect);

// router.get('/availability',
//   allowRoles('Admin', 'Admission Officer'),
//   Allocationctrl.checkSeatAvailability
// );

router.post('/confirm/:applicantId',
  allowRoles('Admin', 'Admission Officer'),
  Allocationctrl.confirmAdmission
);

// List all confirmed admissions
router.get('/admissions',
  Allocationctrl.getAdmissions   // all roles can view
);

// Lookup single admission by admission number
router.get('/admissions/:admNo',
  Allocationctrl.getAdmissionByNo
);

module.exports = router;