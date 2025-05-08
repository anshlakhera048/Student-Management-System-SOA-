require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// 🌐 Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const app = express();
const port = process.env.PORT || 3001;

// ✅ Allow CORS for Vercel frontend & handle preflight
app.use(cors({
    origin: 'https://soafrontend-xi.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type']
}));

// ✅ Handle CORS preflight requests globally
app.options('*', cors());

app.use(bodyParser.json());

// 📦 Mongoose Schema & Model
const studentSchema = new mongoose.Schema({
    name: String
});
const Student = mongoose.model("Student", studentSchema);

// 🚀 Routes

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Student Service');
});  

// Add Student
app.post('/students', async (req, res) => {
    try {
        const student = new Student({ name: req.body.name });
        await student.save();
        res.status(201).json({ message: "Student added!", student });
    } catch (err) {
        console.error("❌ Error adding student:", err);
        res.status(500).json({ message: "Error adding student", error: err.message });
    }
});

// Get All Students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving students", error: err.message });
    }
});

// 🔊 Start server
app.listen(port, () => {
    console.log(`Student service running on port ${port}`);
});
