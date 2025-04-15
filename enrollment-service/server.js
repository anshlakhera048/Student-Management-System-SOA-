const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3003;
app.use(cors());
app.use(bodyParser.json());

let enrollments = [];

app.post('/enroll', (req, res) => {
    const { studentId, courseId } = req.body;
    enrollments.push({ studentId, courseId });
    res.json({ message: 'Enrollment successful' });
});

app.get('/enroll', (req, res) => {
    res.json(enrollments);  // assuming enrollments is your array
});
  
app.get('/enrollments', (req, res) => {
    res.json(enrollments);
});

app.listen(port, () => {
    console.log(`Enrollment service running on port ${port}`);
});
