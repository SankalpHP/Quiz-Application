// import 
const mongoose = require('mongoose');

// define the question schema
let questionSchema = new mongoose.Schema({
    examId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExamCategory',  // refers to the ExamCategory model,
        required:true
    },
    question:{
        type:String,
        require:true
    },
    options:{
        type:Object,
        require:true
    },
    correct:{
        type:String,
        require:true
    },
    marks:{
        type:Number,
        require:true
    }
});

// create the schema in db name 'question'
const question = mongoose.model('question',questionSchema);

module.exports = question;
