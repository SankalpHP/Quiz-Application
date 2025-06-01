// imports
const express = require('express'); // import express
const router = express.Router(); // instance of router function
const attemptedController = require('../controller/attemptedController'); // import attemptedController

// defining the router's
router.post('/attemptedExam',attemptedController.attemptedExam);
router.get('/:userId',attemptedController.getAttemptedExam);
router.post('/attemptedQuestion',attemptedController.getAttemptedQuestions);

module.exports = router;