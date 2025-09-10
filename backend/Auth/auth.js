const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")

dotenv.config()
let secrets ={
    admin : process.env.admin_secret,
    hospital : process.env.hospital_secret,
    user : process.env.user_secret,
}
const generateToken = (user)=>{
    let secret = secrets[user.role]
    const token = jwt.sign(
    { id: user.id, role: user.role}, 
    secret,
    { expiresIn: "1h" }
  );
  console.log("token is",token);
  
    return token
}
const validateToken =(role)=>{
    return (req,res,next)=>{
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "no token" });
        }
        jwt.verify(token, secrets[role], (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unautherized" });
            }
            req.user = decoded;
            next();
        }
        );

}}
module.exports = {validateToken, generateToken}