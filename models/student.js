const mongoose = require('mongoose');

// define the student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    age: {
        type: Number,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    photo: {
        type: String,
        required: false
    },
    
    
});

// create person model
const student = mongoose.model('student', studentSchema);
module.exports = student;
