const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3002;
app.use(cors());
app.use(bodyParser.json());

let courses = [];

app.post('/courses', (req, res) => {
    const course = req.body;
    course.id = courses.length + 1;
    courses.push(course);
    res.json({ message: 'Course added successfully', course });
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.listen(port, () => {
    console.log(`Course service running on port ${port}`);
});
