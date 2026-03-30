const router = require('express').Router();
const institutionController = require('../controllers/institution.controllers');

router.post('/', institutionController.create);
router.get('/', institutionController.getAll);

module.exports = router