// imports
const mongoose = require('mongoose'); // imports mongoose

// creating the schema
const attemptedExams = new mongoose.Schema({
    // defining the fields
    examId:{
        type:String, // type of field
        required:true // required 
    },
    examName:{
        type:String, 
        required:true 
    },
    examDuration:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:String,
        required:true
    },
    attempted:{
        type:Boolean,
        required:true
    },
    userId:{
        type:String,
        required:true
    }
})

// create the schema in db attemptedExams
const model = mongoose.model("attemptedExams",attemptedExams);

module.exports = model;
