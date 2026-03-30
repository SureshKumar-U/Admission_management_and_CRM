const router = require('express').Router();

const applicantsControllers = require("../controllers/applicants.controllers")

router.get("/", applicantsControllers.getAllApplicants)
router.post("/", applicantsControllers.addApplicant)

module.exports = router