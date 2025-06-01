// imports
const attemptedModel = require('../models/attemptedExam');
const startQuizModal = require('../models/startQuiz');
const questionModal = require('../models/question');
const { default: mongoose } = require('mongoose');

module.exports = {
    // save attempted exam
    attemptedExam:async(req,res)=>{
        try {
           
            // destructing the object
            const {examName,examDuration,category,subcategory,attempted,userId} = req.body;
            // setting the examId
            const examId = req.body._id;
            // create a new attemptedModel (document)

            // findOneAndUpdate find by examId if found update if not insert "upsert:true" allow this operation new:true return the updated.inserted object
            const quizUpdate =  await attemptedModel.findOneAndUpdate({examId,userId}
                ,{$set:{examId,examName,examDuration,category,subcategory,attempted,userId}}
                ,{upsert:true,new:true});

            // return response
            return res.json({msg:"user attempted the exam!"});
        } catch (error) {
            console.log(error);
            return res.json({error:error});
        }
    },

    // get the attempted exam
    getAttemptedExam:async(req,res)=>{
        try {
           // getting the userId
            const userId = req.params.userId;
            // getting the attempted exam
            const attempted = await attemptedModel.find({userId});
            // console.log(attempted);
            
            // return response
            return res.json(attempted);   
        } catch (error) {
            console.log(error);
            return res.json(error);
        }
    },
    
    // get the attempted exam questions
    getAttemptedQuestions:async(req,res)=>{
        try {
            // destructing the object
            const{userId,examId} = req.body;
            // getting the attempted questions
            const attemptQuestions = await startQuizModal.find({userId,examId});

            // getting the obtained marks
            const obtainedMarks = await startQuizModal.aggregate([
                {
                    // Match thing conditions
                    $match:{
                        userId:new mongoose.Types.ObjectId(String(userId)),
                        examId:new mongoose.Types.ObjectId(String(examId)),
                        isCorrect:true
                    }
                },
                {
                    // group the data match's the previous conditions
                    $group:{
                        _id:null,
                        obtainedMarks:{$sum:'$marks'},
                    }
                }
            ]);

            // getting the total questions
            const totalQuestion = await questionModal.find({examId});

            // getting the total marks
            const totalMarks = await questionModal.aggregate([
                {
                    // Match thing conditions
                    $match:{
                        examId:new mongoose.Types.ObjectId(String(examId))
                    }
                },
                {
                    // group the data match's the previous conditions
                    $group:{
                        _id:null,
                        totalMarks:{$sum:'$marks'}
                    }
                }
            ])

            // user is pass or failed percentage
            const percentage = (obtainedMarks[0].obtainedMarks/totalMarks[0].totalMarks) * 100;

            const unattemptedQuestions = getUnattemptedQuestion(totalQuestion,attemptQuestions);

            // return the response
            return res.json({percentage,totalMarks,obtainedMarks,unattemptedQuestions,totalQuestion,attemptQuestions});
        } catch (error) {
            console.log(error);
            return res.json(error);
        }
    }
}

function getUnattemptedQuestion(totalQuestion,attemptQuestions){
    let unattempted = []; // Array to store unattempted questions

    totalQuestion.forEach(totalQue => {
        // Check if this total question has been attempted
        const matched = attemptQuestions.some(attemptQue => 
            String(totalQue._id) === String(attemptQue.questionId) // Compare as strings
        );

        // If no match found, it's unattempted — add to result
        if (!matched) {
            unattempted.push(totalQue);
        }
    });

    return unattempted;
}