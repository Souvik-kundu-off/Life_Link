const mongoose = require("mongoose")
const conn = require("../db/conn")

const user= new mongoose.Schema({
    name:{
        type : String,
        required: true
    },
    age:{
        type: Number,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    phone_number:{
        type : Number,
        required : true
    },
    adress:{
        type: String,
        required: true
    },
    blood_group:{
        type: String,
        required: true
    },
    medical_history:{
        type: String,
        
    },
    type:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required : true
    },
    role:{
        default : "user",
        type : String
    }
    
})
module.exports = mongoose.model('user',user);