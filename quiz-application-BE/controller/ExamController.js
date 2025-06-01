// imports
const examModel = require('../models/Exam'); // import the exam model
const questionModel = require('../models/question'); // import the question model

module.exports = {
    // get exam
    getExam:async (req,res)=>{
        try {
            // find all the exam in db
            const exam = await examModel.find();
            // if exam is found
            if(exam.length){
                return res.send(exam);
            }
            return res.json({msg:"No exams found!"});
        } catch (error) {
            // Send the error
            return res.json({error:error})  
        }
    },
    // get exam by id
    getExamByID:async(req,res)=>{
        try {
            // find exam by exam ID
            const exam = await examModel.findById(req.params.id);
            // if exam is found
            if(exam.length != 0){
                return res.send(exam);
            }
            return res.json({msg:"No exams found!"});
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    },
    // add exam
    addExam:async(req,res)=>{
        try {
            // Destructing the object
                const {examName,examDuration,category,subcategory} = req.body;
            // Create an new instance model exam
                const exam = new examModel({examName,examDuration,category,subcategory});
            // save the exam
                await exam.save();
            // sending the response
                return res.json({message:"Exam added successfully!"});
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    },
    // update exam
    updateExam:async(req,res)=>{
        try {
            // Destructing the object
            const {_id,examName,examDuration,category,subcategory} = req.body;
            // find exam by Id and update the exam and return the updated exam
            const updateExam = await examModel.findByIdAndUpdate(_id,{examName,examDuration,category,subcategory});
            // sending the response
            return res.json({message:"Exam updated successfully!"});
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    },
    // delete exam
    deleteExam:async(req,res)=>{
        console.log(req.body);
        
        try {

            /**
             *  Mongoose doesn't support true cascading deletes out of the box, so what I am doing is first 
             *  deleting the question related to that exam Explicitly 
             *  relation of exam to question is 
             *  One Exam to Many Question => so one to many relationship
             * */ 
            
            // delete the question having exam ref by id return the deletedCount 
            await questionModel.deleteMany({examId:req.body.examId});

            // delete the exam by id return the deletedCount 
            const exam = await examModel.deleteOne({_id:req.body.examId});
            if(exam.deletedCount != 0){
                 // sending the response
                return res.status(200).json({msg:'Exam deleted successfully!'});
            }
             // sending the response
            return res.status(404).send('Exam not found!')
        } catch (error) {
            console.error(error);
            return res.json({error:error});
        }
    }
};
