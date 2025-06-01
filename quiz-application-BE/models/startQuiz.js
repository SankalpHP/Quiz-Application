// Imports
const mongoose = require('mongoose');

// define the schema
const startQuiz = new mongoose.Schema({
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExamCategory',
        required:true
    },
    questionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'question',
        required:true
    },
    question:{
        type:String,
        required:true
    },
    options:{
        type:Object,
        required:true
    },
    correct:{
        type:String,
        required:true
    },
    userSelected:{
        type:String,
        required:false
    },
    userId:{ // Modifiy this userId field in future
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    isCorrect:{
        type:Boolean,
        required:false,
    },
    marks:{
        type:Number,
        required:true
    },
    attempted:{
        type:Boolean,
        required:true
    }

    // Add attempt bu user or not property in this schema in future

});

// creating model from the schema
let Quiz = mongoose.model('Quiz',startQuiz);

module.exports = Quiz;