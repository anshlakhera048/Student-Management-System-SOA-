require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'enrollmentDB'
})
.then(() => console.log("✅ Connected to MongoDB Atlas (Enrollment DB)"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3003;
app.use(cors());
app.use(bodyParser.json());

// Schema
const enrollmentSchema = new mongoose.Schema({
    studentId: String,
    courseId: String
});
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// Enroll Student
app.post('/enroll', async (req, res) => {
    try {
        const enrollment = new Enrollment({
            studentId: req.body.studentId,
            courseId: req.body.courseId
        });
        await enrollment.save();
        res.json({ message: "Student enrolled!", enrollment });
    } catch (err) {
        res.status(500).json({ message: "Error enrolling student" });
    }
});

// Get All Enrollments
app.get('/', (req, res) => {
    res.send('Welcome to the enrollment Service');
  });
  

app.listen(port, () => {
    console.log(`Enrollment service running on port ${port}`);
});
