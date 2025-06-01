// imports
const mongoosee = require('mongoose');

// defining schema
const auth = new mongoosee.Schema({
    // defining the fields
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    roles:{
        type:Array,
        required:true
    },
    // user can update the below fields later
    age:{
        type:Number,
        required:false
    },
    location:{
        type:Object,
        required:false
    },
    profession:{
        type:String,
        required:false
    }
})

// creating the schema in db
const quizAuth = mongoosee.model('auth',auth);

module.exports = quizAuth;