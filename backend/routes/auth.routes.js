const router = require('express').Router();
const authCtrl = require('../controllers/auth.controllers');
const { protect } = require('../middlewares/auth.middleware');

router.post('/login', authCtrl.login);
router.get('/me', protect, authCtrl.getProfile);
router.post('/register', authCtrl.register);

module.exports = router;