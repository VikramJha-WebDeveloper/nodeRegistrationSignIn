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
    new StudentsModel(req.body).save().then((data)=>{
        if(data){
            res.render("login");
        }else{
            res.send("No data")
        }
    }).catch((err)=>{
        res.send(err);
    });
});

app.get("/", (req, res)=>{
    res.render("registrationForm");
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});