const mongoose = require("mongoose")
const conn = require("../db/conn")

const request = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    blood_group:{
        type: String,
        required: true
    },
    reason:{
        type: String,
        required: true
    },
    request_date:{
        type: Date,
        required: true
    },
    uid :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})
module.exports = mongoose.model("request",request)