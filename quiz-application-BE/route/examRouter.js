// imports
const examController = require('../controller/ExamController'); // import exam controller
const express = require('express'); // import the express

const router = express.Router(); // create instance of Router

// restfull api routes 
router.get('/exams',examController.getExam);
router.post('/exams',examController.addExam);
router.get('/:id',examController.getExamByID);
router.put('/exams',examController.updateExam);
router.delete('/exams',examController.deleteExam);

module.exports = router;
