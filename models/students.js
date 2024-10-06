const mongoose = require("mongoose");

const studentsSchema = new mongoose.Schema({
    name: {type: String, trim: true, required: true},
    age: {type: Number, min: 5, max: 20, required: true},
    email: {type: String, trim: true, required: true},
    password: {type: String, required: true},
    confirmPassword: {type: String, required: true},
});

const StudentsModel = mongoose.model("students", studentsSchema);
module.exports = StudentsModel;