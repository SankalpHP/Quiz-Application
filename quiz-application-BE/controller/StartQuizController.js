// imports
const startQuizModel = require('../models/startQuiz');
const examModel = require('../models/Exam');

module.exports = {
    // Save the question
    SaveQuestion:async(req,res)=>{
        try {
            // destructing the object
            const {questionId,examId,question,options,correct,userSelected,userId,isCorrect,marks,attempted} = req.body.body;

           // findOneAndUpdate find by questionId if found update if not insert "upsert:true" allow this operation new:true return the updated.inserted object
            const quizUpdate =  await startQuizModel.findOneAndUpdate({questionId,userId}
                ,{$set:{examId,question,options,correct,userSelected,userId,isCorrect,marks,attempted}}
                ,{upsert:true,new:true});
           // return the response
           return res.json(quizUpdate);
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    },
    getDuration:async(req,res)=>{
        try {
            // findById get exam by exam Id 
           const exam =  await examModel.findById(req.params.examId);
           // return the exam as response
           return res.json(exam);
        } catch (error) {
            console.log(error);
            res.json({error:error});
        }
    }
}