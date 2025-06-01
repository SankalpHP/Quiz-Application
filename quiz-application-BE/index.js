// Import
const express = require('express'); // import the express
const app = express(); // create instance of express
require('dotenv').config(); // import the dotenv
const connected = require('./db/dbConfig'); // import the connection from dbConfig
const examRoute = require('./route/examRouter'); // import the exam router
const questionRoute = require('./route/questionRouter'); // import the question router
const startQuizRoute = require('./route/startQuizRouter'); // import the quiz router
const quizAuth = require('./route/authRouter'); // import the auth router
const attemptedRoute = require('./route/attemptedRouter'); // import attemptedRoute
const cors = require('cors'); // import the cors

const PORT = process.env.PORT; // getting the port from the env

// middleware for CROS 
app.use(cors());

// middleware for parsing the incoming data and put it in req.body
app.use(express.json());

// middleware for exam routes
app.use('/exam',examRoute);

// middleware for question routes
app.use('/question',questionRoute);

// middleware for start quiz routes
app.use('/quiz',startQuizRoute);

// middleware for quiz auth routes
app.use('/auth',quizAuth);

// middleware for attempted routes
app.use('/attempted',attemptedRoute);

app.listen(PORT,async ()=>{
    // Connecting to monogdb
    await connected()
    console.log(`The Application is listing on port http://localhost:${PORT}/`);
});