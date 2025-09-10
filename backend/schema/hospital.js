const mongoose = require("mongoose")
const conn = require("../db/conn")

const hospital = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    license_number:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    contact_person_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone_number:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isValidated:{
        type: Boolean,
        default: false
    },role:{
        type : String,
        default : "hospital"
    }
    
})
module.exports = mongoose.model("hospital",hospital)