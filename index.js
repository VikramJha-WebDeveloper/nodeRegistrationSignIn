require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bcrypt = require("bcryptjs");

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
    const {email, password, confirmPassword} = req.body;
    StudentsModel.findOne({email: email}).then((data)=>{
        if(data){
            console.log("data", data);
            res.send("This email already exists");
        }else{
            if(password === confirmPassword){
                new StudentsModel(req.body).save().then((data)=>{
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
        };
    });
    
});

app.post("/myWebsite", (req, res)=>{
    const {email, password} = req.body;
    StudentsModel.findOne({email: email}).then((data)=>{
        if(data){
            bcrypt.compare(password, data.password).then((isMatch)=>{
                console.log(isMatch);
                if(isMatch){
                    res.render("myWebsite")
                }else{
                    res.send("invalid inputs")
                };
            }).catch((err)=>{
                res.send("server error while matching password");
            }); 
        }else{
            res.send("This email does not exists");
        };
    }).catch((err)=>{
        console.log("Server error while matching email");
    });
});

app.get("/", (req, res)=>{
    res.render("registrationForm");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});