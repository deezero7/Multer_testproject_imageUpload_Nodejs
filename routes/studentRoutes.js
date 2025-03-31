const express = require('express');
const router = express.Router();
const student = require('./../models/student');
const multer = require('multer');

/*
// set up multer for file upload for local storage  
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'upload/'); // specify the directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // append timestamp to the original filename
    }
}); 
*/

// store files in memory , configer multer to store files in memory as buffer
// this is useful for small files or when you want to process the file before saving it to disk
const storage = multer.memoryStorage(); // store files in memory instead of disk
const upload = multer({ storage: storage }); // create multer instance with memory storage


// route to create a new student
router.post('/create',upload.single('photo') ,async (req, res) => {
    try {
        const { name, email, age, phone, address } = req.body;

        //const photpath = req.file ? req.file.path : null; // get the path of the uploaded file
        const photoBase64 = req.file ? req.file.buffer.toString('base64') : null; // convert image buffer to base64 string

        //create student record with the data from the request body, with encoded image
        const newStudent = new student({
            name,
            email,
            age,
            phone,
            address,
            photo: photoBase64
        });

        await newStudent.save(); // save the student record to the database
        res.status(201).json({ message: 'Student created successfully', student: newStudent });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating student', error: error.message });
    }
});


module.exports = router;
