require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 🔗 Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'enrollmentDB',
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB Atlas (Enrollment DB)"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3003;

// ✅ CORS
app.use(cors({
    origin: 'https://soafrontend-xi.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));
app.options('*', cors());

app.use(bodyParser.json());

// 📘 Schema
const enrollmentSchema = new mongoose.Schema({
    studentId: String,
    courseId: String
});
const Enrollment = mongoose.model("Enrollment", enrollmentSchema);

// 📝 Enroll Student
app.post('/enroll', async (req, res) => {
    try {
        const enrollment = new Enrollment({
            studentId: req.body.studentId,
            courseId: req.body.courseId
        });
        await enrollment.save();
        res.status(201).json({ message: "Student enrolled!", enrollment });
    } catch (err) {
        console.error("❌ Error enrolling student:", err);
        res.status(500).json({ message: "Error enrolling student", error: err.message });
    }
});

// 🏠 Root
app.get('/', (req, res) => {
    res.send('Welcome to the Enrollment Service');
});

// 📄 All Enrollments
app.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await Enrollment.find();
        res.json(enrollments);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving enrollments", error: err.message });
    }
});

// 🚀 Start
app.listen(port, () => {
    console.log(`Enrollment service running on port ${port}`);
});
