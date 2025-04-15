const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;
app.use(cors());
app.use(bodyParser.json());

let students = [];

app.post('/students', (req, res) => {
    const student = req.body;
    student.id = students.length + 1;
    students.push(student);
    res.json({ message: 'Student added successfully', student });
});

app.get('/students', (req, res) => {
    res.json(students);
});

app.listen(port, () => {
    console.log(`Student service running on port ${port}`);
});
