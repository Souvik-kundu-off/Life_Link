const express = require("express")
const drouter = express.Router()
const user = require("../schema/user")
const bcrypt = require("bcrypt")
const donated = require("../schema/donated")
const request = require("../schema/request")
const { generateToken,validateToken } = require("../Auth/auth")
drouter.get("/",(req,res)=>{
    res.status(200).json({"message":"This is to get all doner"})
})
drouter.post("/register",async(req,res)=>{
    const response = req.body
    const password = await bcrypt.hash(response.password,10)
    try {
        const new_user = await new user({
            name: response.name,
            age: response.age,
            email: response.email,
            phone_number : response.phone_number,
            adress : response.address,
            blood_group : response.blood_group,
            medical_history : response.medical_history,
            type : response.type[0],
            password : password
        })
        
        
        await new_user.save()
        res.status(200).json({data:response})
    } catch (error) {
        console.log(error);
        res.status(500).json({"message":"bad request"})
    }
    
})
drouter.post("/login",async (req,res) => {
    const body = req.body

    console.log(body);
    
    const u = await user.findOne({phone_number:body.phone_number})
    console.log(u.role);
    
    if (!u) {
         res.status(401).json({"message":"Username or Pasword is incorrect"})
    } else {
        const p = await bcrypt.compare(body.password,u.password)
                if (!p) {
                    res.status(401).json({"message":"Username or Pasword is incorrect"})
                } else {
                    res.status(200).json({"message":"Login Success","token":generateToken(u)})
                }
        
    }
})

drouter.get("/getuser",validateToken("user"),async(req,res)=>{
    const data = await user.findById(req.user.id)
    if (!data) {
        res.status(404).json({"message":"Not_found"})
    } else {
        res.status(200).json({"data":data})
    }
})
drouter.post("/check-token",validateToken("user"), (req, res) => {
    res.status(200).json({ message: "Token is valid" });
})
drouter.post("/reqblood", validateToken("doner"), async (req, res) => {
  const body = req.body;

  try {
    const new_request = new request({
      uid: body.user_id,            // user reference
      name: body.name,              // requester name
      quantity: body.quantity,      // how many units
      blood_group: body.blood_group, // blood group needed
      reason: body.reason,          // medical reason
      request_date: new Date()      // auto-set to now
    });

    await new_request.save();

    res.status(201).json({
      message: "Blood request submitted successfully",
      request: new_request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create blood request" });
  }
});
drouter.get("/dashboard-stats", validateToken("doner"), async (req, res) => {
  try {
    const donations = await donated.find({ uid: req.user.id }).sort({ donation_date: -1 });

    const totalDonations = donations.length;
    const livesSaved = totalDonations * 3; // each donation saves 3 lives

    let nextEligible = "N/A";
    if (donations.length > 0) {
      const lastDonationDate = donations[0].donation_date;
      const nextDate = new Date(lastDonationDate);
      nextDate.setDate(nextDate.getDate() + 90); // 90-day gap
      const now = new Date();
      const diffDays = Math.max(Math.ceil((nextDate - now) / (1000 * 60 * 60 * 24)), 0);
      nextEligible = `${diffDays} days`;
    }

    res.status(200).json({ totalDonations, livesSaved, nextEligible });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
});

module.exports = drouter
