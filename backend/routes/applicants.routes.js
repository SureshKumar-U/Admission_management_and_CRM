const router = require('express').Router();

const applicantsCtrl = require("../controllers/applicants.controllers")
const { protect }    = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');


router.use(protect);
router.use(allowRoles('Admin', 'Admission Officer'));

router.get('/', applicantsCtrl.getAllApplicants )
router.post("/", applicantsCtrl.createApplicant)
router.get('/recent', applicantsCtrl.recentApplicants) 
router.put('/:id',applicantsCtrl.updateApplicant )

module.exports = router;