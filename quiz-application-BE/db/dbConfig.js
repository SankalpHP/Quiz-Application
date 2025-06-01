// imports
const mongoose = require('mongoose'); // import mongoose
require('dotenv').config(); // import dotenv


const connectMongo = async ()=>{
    try {
        // Connecting to mongodb
        await mongoose.connect(process.env.URL);
        console.log("Connected to mongodb successfully!"); 
    } catch (error) {
        console.error(error);
    }
};

module.exports = connectMongo;
