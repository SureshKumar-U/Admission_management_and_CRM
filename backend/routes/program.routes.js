
const router = require('express').Router();
const programCtrl = require('../controllers/program.controllers');
const { protect } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware')

router.use(protect);
router.get('/', programCtrl.getAll)
router.post("/",allowRoles('Admin'), programCtrl.create);
router.get('/:id', programCtrl.getOne)
router.put('/:id', allowRoles('Admin'), programCtrl.update)
router.delete("/:id", allowRoles('Admin'), programCtrl.remove);

// Seat matrix sub-resource
router.post('/:id/seat-matrix', allowRoles('Admin'), programCtrl.createSeatMatrix);
router.get('/:id/seat-matrix', programCtrl.getSeatMatrix);
router.put('/:id/seat-matrix', allowRoles('Admin'), programCtrl.updateSeatMatrix);

module.exports = router;