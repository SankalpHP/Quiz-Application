// imports
const express = require('express');
const startQuizController =  require('../controller/StartQuizController');
const router = express.Router();

router.post('/saveQuiz',startQuizController.SaveQuestion);
router.get('/:examId',startQuizController.getDuration);

module.exports = router;
