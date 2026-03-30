const router = require('express').Router();
const dashboarController = require('../controllers/dashboard.controllers');
const { protect }  = require('../middlewares/auth.middleware');

router.use(protect);
router.get('/stats', dashboarController.getStats);

module.exports = router;