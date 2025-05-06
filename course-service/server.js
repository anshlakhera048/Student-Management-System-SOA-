require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'courseDB'
})
.then(() => console.log("✅ Connected to MongoDB Atlas (Course DB)"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = 3002;
app.use(cors());
app.use(bodyParser.json());

// Schema
const courseSchema = new mongoose.Schema({
    name: String
});
const Course = mongoose.model("Course", courseSchema);

// Add Course
app.post('/courses', async (req, res) => {
    try {
        const course = new Course({ name: req.body.name });
        await course.save();
        res.json({ message: "Course added!", course });
    } catch (err) {
        res.status(500).json({ message: "Error adding course" });
    }
});

// Get All Courses
app.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

app.listen(port, () => {
    console.log(`Course service running on port ${port}`);
});
