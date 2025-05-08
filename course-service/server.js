require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'courseDB',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas (Course DB)"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3002;

// ✅ CORS Handling
app.use(cors({
    origin: 'https://soafrontend-xi.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.options('*', cors()); // Preflight support

app.use(bodyParser.json());

// 📘 Schema
const courseSchema = new mongoose.Schema({ name: String });
const Course = mongoose.model("Course", courseSchema);

// ➕ Add Course
app.post('/courses', async (req, res) => {
    try {
        const course = new Course({ name: req.body.name });
        await course.save();
        res.status(201).json({ message: "Course added!", course });
    } catch (err) {
        console.error("❌ Error adding course:", err);
        res.status(500).json({ message: "Error adding course", error: err.message });
    }
});

// 🏠 Root
app.get('/', (req, res) => {
    res.send('Welcome to the Course Service');
});

// 📄 All Courses
app.get('/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving courses", error: err.message });
    }
});

// 🚀 Start
app.listen(port, () => {
    console.log(`Course service running on port ${port}`);
});
