require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch(err => console.error("❌ MongoDB connection error:", err));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

const studentSchema = new mongoose.Schema({
    name: String
});

const Student = mongoose.model("Student", studentSchema);


// Add Student
app.post('/students', async (req, res) => {
    try {
        const student = new Student({ name: req.body.name });
        await student.save(); // Saves in MongoDB
        res.json({ message: "Student added!", student });
    } catch (err) {
        res.status(500).json({ message: "Error adding student" });
    }
});

// Get All Students
app.get('/students', async (req, res) => {
    const students = await Student.find(); // Fetches from MongoDB
    res.json(students);
});


app.listen(port, () => {
    console.log(`Student service running on port ${port}`);
});
