const express = require("express")
const app = express()
const drouter = require("./router/doner.routes")
const conn = require("./db/conn")
const hrouter = require("./router/hospital.routes")
const bcrypt = require("bcrypt")
const arouter = require("./router/admin.routes")
const morgan = require("morgan")
const cors = require("cors")

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors())
app.use("/doner",drouter)
app.use("/hospital",hrouter)
app.use("/admin",arouter)
app.use(express.static('dist'))

app.get("/",(req,res)=>{
    res.status(200).json({"message":"Hello world"})
})

app.listen(5000,()=>{
    console.log("http://localhost:5000");
    
})