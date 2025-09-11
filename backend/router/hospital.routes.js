const express = require("express")
const hrouter = express.Router()
const hospital = require("../schema/hospital")
const donated = require("../schema/donated")
const user = require("../schema/user")
const request = require("../schema/request")
const bcrypt = require("bcrypt")
const { validateToken,generateToken } = require("../Auth/auth")

hrouter.get("/",(req,res)=>{
    res.status(200).json({"message":"Hello"})
})
hrouter.post("/register",async(req,res)=>{
    const body = req.body
    const password = await bcrypt.hash(body.password,10)
    
    try {
        const newhospital = await new hospital({
        name : body.name,
        license_number : body.license_number,
        description : body.description,
        contact_person_name : body.staffName,
        email : body.email,
        address : body.address,
        phone_number : body.phone_number,
        password : password
    })
    await newhospital.save()
    res.status(200).json({"DAta":body})
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"bad request"})   
    }    
})
hrouter.post("/login",async (req,res) => {
    const body = req.body
    const u = await hospital.findOne({email:body.email})
    if(!u){
        res.status(401).json({"message":"Username or Pasword is incorrect"})
    }else{
        if (!u.isValidated) {
            return res.status(403).json({"message":"Hospital registration pending admin approval"});
        }
        const p = await bcrypt.compare(body.password,u.password)
        if (!p) {
            res.status(401).json({"message":"Username or Pasword is incorrect"})
        } else {
            res.status(200).json({"message":"Login Success","token":generateToken(u)})
        }
    }
})
hrouter.get("/donerdata",validateToken("hospital"),async (req,res) => {
    const body = req.body
    const response = await donated.findOne({phone_number:body.phone_number})
    if (!response) {
        res.status(404).json({"message":"USer not available"})
    } else {
        res.status(200).json({"Data":response})
    }
})
hrouter.get("/getdonerdata",validateToken("hospital"),async (req,res) => {
    const body = req.body
    try {
        const data = await donated.find({hospital_id : body.hospital_id})
        res.status(200).json({"data":data})
    } catch (error) {
        res.status(500).json({"message":"internal server error"})
    }
})
hrouter.post("/adddoner",validateToken("hospital"),async(req,res)=>{

    const body = req.body
    const response = await user.findOne({phone_number:body.phone_number})
    if (!response) {
        res.status(404).json({"message":"USer not registered in Portal"})
    } else {
        try {
            const d = await new donated({
                name: body.name,
                age:body.age,
                phone_number:body.phone_number,
                blood_group:body.blood_group,
                donation_date:body.donation_date,
                hospital_id: hospital.hospital_id,
                user_id: response._id,
                role : "doner"
            })
            await d.save()
            res.status(200).json({"message":"Done"})
        } catch (error) {
            res.status(500).json({"message":"internal server error"})
        }
    }

})
hrouter.post("/addreciever",validateToken("hospital"),async(req,res)=>{

    const body = req.body
    const response = await user.findOne({phone_number:body.phone_number})
    if (!response) {
        res.status(404).json({"message":"USer not registered in Portal"})
    } else {
        try {
            const r = await new request({
                name: body.name,
                age:body.age,
                phone_number:body.phone_number,
                blood_group:body.blood_group,
                request_date:body.request_date,
                hospital_id: hospital.hospital_id,
                user_id: response._id,
                role : "reciever"
            })
            await r.save()
            res.status(200).json({"message":"Done"})
        } catch (error) {
            res.status(500).json({"message":"internal server error"})
        }
    }

})


hrouter.post("/check-token",validateToken("hospital"), (req, res) => {
    res.status(200).json({ message: "Token is valid" });
})

module.exports = hrouter