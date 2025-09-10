const mongoose = require("mongoose")
const conn = require("../db/conn")
const hospital = require("./hospital")

const doner = new mongoose.Schema({
    name : {
        type :String,
        required : true
    },
    age:{
        type : Number,
        required : true
    },
    phone_number:{
        type : Number,
        required : true
    },
    blood_group:{
        type : String,
        required : true
    },
    donation_date:{
        type : Date,
        required : true
    },role:{
        type : String,
        default : "doner"
    },hospital_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "hospital"
    },user_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})
module.exports = mongoose.model("donated",doner)