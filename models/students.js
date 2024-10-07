const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentsSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, min: 5, max: 20, required: true},
    email: {type: String, trim: true, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
});

studentsSchema.pre("save", function(next){
    console.log("schema", this);
    bcrypt.hash(this.password, 10).then((hashPassword)=>{
        console.log("hashpassword", hashPassword);
        this.password = hashPassword;
        this.confirmPassword = undefined;
        next();
    }).catch((err)=>{
        console.log(err);
    });
});

const StudentsModel = mongoose.model("students", studentsSchema);
module.exports = StudentsModel;