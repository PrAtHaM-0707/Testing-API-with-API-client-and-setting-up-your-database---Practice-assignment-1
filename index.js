const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;


app.use(express.json());


const students = [
  { student_id: "1", name: "Alice Johnson", marks: { math: 85, science: 90, english: 78, history: 88, geography: 92 }, total: 433 },
  { student_id: "2", name: "Bob Smith", marks: { math: 80, science: 75, english: 85, history: 95, geography: 75 }, total: 410 },
  { student_id: "3", name: "Charlie Davis", marks: { math: 70, science: 72, english: 68, history: 74, geography: 65 }, total: 349 },
  { student_id: "4", name: "David Lee", marks: { math: 60, science: 55, english: 58, history: 62, geography: 65 }, total: 300 }
];


app.use(express.static('static'));
app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/students/above-threshold', (req, res) => {
  const { threshold } = req.body;

  if (typeof threshold !== 'number' || isNaN(threshold) || threshold < 0) {
    return res.status(400).json({ error: "Invalid threshold value. Please provide a positive number." });
  }


  const filteredStudents = students.filter(student => student.total > threshold);


  res.json({
    count: filteredStudents.length,
    students: filteredStudents.map(student => ({ name: student.name, total: student.total }))
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
