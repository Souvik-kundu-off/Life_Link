const express = require("express")
const arouter = express.Router()
const admin = require("../schema/admin")
const hospital = require("../schema/hospital")
const donated = require("../schema/donated")
const user = require("../schema/user")
const bcrypt = require("bcrypt")
const {validateToken, generateToken} = require("../Auth/auth")
arouter.get("/", (req, res) => {
    res.status(200).json({ "message": "Hello hospital" })
})
arouter.post("/register", async (req, res) => {
  try {
    const body = req.body;

    // create admin object
    const u = new admin({
      fullname: body.fullname,
      username: body.username,
      password: await bcrypt.hash(body.password, 10),
      isSuperuser: body.isSuperuser
    });

    // save admin
    await u.save();

    res.status(200).json({ message: "Admin register success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Bad request" });
  }
});
arouter.post("/login", async (req, res) => {
    const body = req.body
    const u = await admin.findOne({ username: body.username });
    if (!u) {
        return res.status(401).json({ message: "Username or Password is incorrect" });
    }

    const p = await bcrypt.compare(body.password, u.password);
    if (!p) {
        return res.status(401).json({ message: "Username or Password is incorrect" });
    }
    u.role = 'admin'; // Set role for token generation
    const token = generateToken(u);
    return res.status(200).json({ message: "Login Success", token: token });
    


})
arouter.patch("/approvehospital/:license_number",validateToken("admin"), async (req, res) => {
    const license_number = req.params.license_number
    try {
        const h = await hospital.findOneAndUpdate({ license_number: license_number }, { isValidated: true })
        if (!h) {
            return res.status(404).json({ "message": "Hospital not found" })
        }
        return res.status(200).json({ "message": "Hospital approved successfully" })
    } catch (error) {
        return res.status(500).json({ "message": "Bad request" })
    }
})
arouter.get("/getapprovedhospitals",validateToken("admin"), async (req, res) => {
    try {
        const h = await hospital.find({isValidated: true})
        if (!h) {
            return res.status(404).json({ "message": "No hospitals found" })
        }
        const responseData = h.map(h => ({
            hospital_name: h.name,
            license_number: h.license_number,
            isValidated: h.isValidated
        }));

        return res.status(200).json({ "data": responseData });
    } catch (error) {
        return res.status(500).json({ "message": "Bad request" })
    }
})
arouter.get("/getpendinghospitals",validateToken("admin"), async (req, res) => {
    try {
        const h = await hospital.find({isValidated: false})
        if (!h) {
            return res.status(404).json({ "message": "No hospitals found" })
        }
        const responseData = h.map(h => ({
            hospital_name: h.name,
            license_number: h.license_number,
            isValidated: h.isValidated
        }));

        return res.status(200).json({ "data": responseData });
    } catch (error) {
        return res.status(500).json({ "message": "Bad request" })
    }
})
arouter.get("/getnumbers",validateToken("admin"), async (req, res) => {
    try {
        
        const validatedHospitals = await hospital.countDocuments({ isValidated: true });
        const pendingHospitals = await hospital.countDocuments({ isValidated: false });
        const totalDonations = await donated.countDocuments();
        const totalUser = await user.countDocuments();
        const totalHospitals = await hospital.countDocuments();
        return res.status(200).json({
            totalHospitals,
            validatedHospitals,
            pendingHospitals,
            totalDonations,
            totalUser,
            
        });
        
    } catch (error) {
        return res.status(500).json({ "message": "Bad request" })
    }
})
arouter.get("/getusers",validateToken("admin"), async (req, res) => {
    try {
        const u = await user.find({})
        if (!u) {
            return res.status(404).json({ "message": "No users found" })
        }
        const responseData = u.map(u => ({
            fullname: u.name,
            phone_number: u.phone_number,
            blood_group: u.blood_group,
            age: u.age,
            type: u.type,
            medical_history: u.medical_history
        }));
        return res.status(200).json({ "data": responseData });
    } catch (error) {
        return res.status(500).json({ "message": "Bad request" })
    }
})
arouter.post("/check-token",validateToken("admin"), (req, res) => {
    res.status(200).json({ message: "Token is valid" });
})
module.exports = arouter