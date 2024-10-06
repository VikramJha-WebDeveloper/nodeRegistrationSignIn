require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const StudentsModel = require("./models/students.js");

const app = express();
const port = process.env.PORT || 3000;
const databaseURL = process.env.DATABASE_URL;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

mongoose.connect(databaseURL).then(()=>{
    console.log(`Connected successfully`);
}).catch((err)=>{
    console.log(err);
});

app.post("/login", (req, res)=>{
    const {password, confirmPassword} = req.body;
    if(password === confirmPassword){
        new StudentsModel(req.body).save().then((data)=>{
            console.log("login", data);
            if(data){
                res.render("login");
            }else{
                res.send("No data")
            }
        }).catch((err)=>{
            res.send(err);
        });
    }else{
        res.send("password doesn't match");
    };
});

app.post("/myWebsite", (req, res)=>{
    const {email, password} = req.body;
    StudentsModel.findOne({email: email, password: password}).then((data)=>{
        console.log("myWebsite", data);
        if(data){
            res.render("myWebsite")
        }else{
            res.send("invalid inputs");
        };
    }).catch((err)=>{
        console.log(err);
    });
});

app.get("/", (req, res)=>{
    res.render("registrationForm");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});