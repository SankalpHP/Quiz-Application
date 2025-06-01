// imports
const questionModel = require('../models/question');

module.exports = {
    // Save questions
    addQuestion:async(req,res)=>{
        try {
            // destructing the json object
            const {examId,question,options,correct,marks} = req.body;
            // create a new instance of question modal
            const que = new questionModel({examId,question,options,correct,marks});
            // save the question
            await que.save();
            // return the response
            return res.json({msg:"Question added successfully!"});
        } catch (error) {
            console.error(error);
            return res.send(error);
        }
    },
    // Get questions by examId
    getQuestionById:async(req,res)=>{
        try {
            const examId = req.params.examId;
            // fetch the question by id
            const question  = await questionModel.find({examId});
            // return the response
            if(question.length){
                return res.status(200).json(question);
            }
           return res.status(200).json({msg:"No question found"});
        } catch (error) {
            console.error(error);
            return res.send(error);
        }
    },
    // update the question by questionId
    updateQuestion:async(req,res)=>{
        try {
            // destructing the json object   
            const {question,options,correct,marks,_id} = req.body;
            // find the question by id, update the question  and return the updated question
            let que = await questionModel.findByIdAndUpdate(_id,{question,options,correct,marks});
            // sending the response
            return res.json({msg:"Question updated successfully!"});   
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    },
    // delete question by questionId
    deleteQuestion:async(req,res)=>{
        try {
            const question = await questionModel.deleteOne({_id:req.body._id});
            if(question.deletedCount != 0){
                return res.status(200).json({msg:"Question deleted successfully!"})
            }
            // sending the response
            return res.status(404).json({msg:'Exam not found!'})
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    }
}