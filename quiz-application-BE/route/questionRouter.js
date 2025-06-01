// imports
const questionController = require('../controller/QuestionController');
const express = require('express'); // imports the express
const router = express.Router(); // create instance of Router

// restfull api routes
router.post('/question',questionController.addQuestion);
router.get('/:examId',questionController.getQuestionById);
router.put('/question',questionController.updateQuestion);
router.delete('/question',questionController.deleteQuestion);

module.exports = router;