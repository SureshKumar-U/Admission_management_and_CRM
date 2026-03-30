const router = require('express').Router();
const instCtrl = require('../controllers/institution.controllers');
const deptCtrl = require('../controllers/department.controllers');
const { protect } = require('../middlewares/auth.middleware');
const { allowRoles } = require('../middlewares/role.middleware');

router.use(protect);

router.get('/', deptCtrl.getAll)
router.post('/', allowRoles('Admin'), deptCtrl.create);
router.get('/:id',deptCtrl.getOne)
router.put('/:id',allowRoles('Admin'), deptCtrl.update)
router.delete('/:id',allowRoles('Admin'), deptCtrl.remove)


module.exports = router;