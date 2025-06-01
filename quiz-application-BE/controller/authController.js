// imports
const authModel = require('../models/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    // get the user
    LoginUser:async(req,res)=>{
        try {
            // destructing the js object
            const {email,password} = req.body;
            
            // find the user by email
            const user = await authModel.findOne({email});
            
            if(!user){
                return res.json({error:"user not found"})
            }

            // compare the hashed password with the provided password
            const isMatch = await bcrypt.compare(password,user.password);

            if(!isMatch){
                return res.json({error:"Invalid Credentials"});
            }
            
            // generate token
            const token = jwt.sign({id:user._id,name:user.name,email:user.email,role:user.roles},'my-secret-key',{expiresIn:'1d'});

            return res.json({msg:"Login successfully!",token:token});
          
        } catch (error) {
            console.log(error);
            return res.json({error:error});
        }
    },

    // Save the user
    registerUser:async(req,res)=>{
        try {
            // destructing the js object
            let {name,email,password,age,location,profession} = req.body;
            const roles = ["user"];
            
            // find user by email
            const alreadyRegister = await authModel.findOne({email});

            // if user already exists
            if(alreadyRegister != null){
                return res.json({flag:false,msg:"Oops user already exists!"})
            }

            // Encrypt the password
            const saltRounds = await bcrypt.genSalt(10); // Number of salts rounds for hashing
            password = await bcrypt.hash(password,saltRounds);
           
            // create the new authModel object for user
            const user = new authModel({name,email,password,roles,age,location,profession});

            // saving the new user object
            await user.save();

            // sending the response
            return res.json({flag:true,msg:"Thanks for signing up. Welcome to our community. We are happy to have you on board."});
        } catch (error) {
            console.log(error);
            return res.json({error:error});
        }
    },

    // get the user details
    getuser:async(req,res)=>{
        try {
            // get the user details by ID
            const user = await authModel.findById(req.params.id);
            // return the user
            return res.json(user)
        } catch (error) {
            return res.json(error)
        }
    },

    // update register user
    updateRegisterUser:async(req,res)=>{
        try {
            // destructing the javascript object
            const {id,name,email,age,location,profession} = req.body;
            // find user by Id and update the user and return the updated user
            const user = await authModel.findByIdAndUpdate(id,{name,email,age,location,profession});
            // return the updated user
            return res.json({msg:"User registration updated successfully"});
        } catch (error) {
            return res.json(error);
        }
    },

    // get all users
    getAlluser:async(req,res)=>{
        try {
            // getting all user data
            const users = await authModel.find();
            // return the response
            return res.json(users);
        } catch (error) {
            console.log(error);
            return res.json({error:error});
        }
    },

     // get user name
    getUserName:async(req,res)=>{
        try {
            // destructing the object in js
            const {_id} = req.body;
            // find user by it's Id
            const user = await authModel.findById(_id);
            // sending the response
            return res.json({name:user.name});
        } catch (error){
            console.log(error);
            return res.json(error);
        }
    }
}