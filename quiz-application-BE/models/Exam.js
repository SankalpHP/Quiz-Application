// imports
const mongoose = require('mongoose'); // import mongoose 

// define the Schema
const ExamCategory = new mongoose.Schema({
    // define the schema fields
    examName:{
        type:String, // type of field
        required:true, // required true
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
    }
});

// create the schema in db name 'ExamCategory'
const category = mongoose.model('ExamCategory',ExamCategory);

module.exports = category;