const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON payloads
app.use(express.json());

// In-memory data store with initial dummy data
let courses = [
  {
    id: 1,
    courseCode: "PC24",
    courseName: "System Integration and Architecture 1",
    units: 3,
    instructor: "Mr. Edward James V. Grageda",
    submittedBy: "Diana Pariñas (Student Number: 423001145)"
  }
];

// --- ENDPOINTS ---

// 1. GET /api/courses - Get all courses
app.get('/api/courses', (req, res) => {
  res.status(200).json(courses);
});

// 2. GET /api/courses/:id - Get a specific course by ID
app.get('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  res.status(200).json(course);
});

// 3. POST /api/courses - Create a new course
app.post('/api/courses', (req, res) => {
  const { courseCode, courseName, units, instructor } = req.body;

  // Input Validation (Part 2)
  if (!courseCode || !courseName) {
    return res.status(400).json({ error: "courseCode and courseName are required fields" });
  }

  const newCourse = {
    id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
    courseCode,
    courseName,
    units: units || 3,
    instructor: instructor || "TBD",
    submittedBy: "Diana Pariñas (Student Number: 423001145)"
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
});

// 4. PUT /api/courses/:id - Update an existing course
app.put('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === id);

  // ID Existence Check (Part 2)
  if (courseIndex === -1) {
    return res.status(404).json({ error: "Course not found" });
  }

  const { courseCode, courseName, units, instructor } = req.body;

  // Input Validation (Part 2)
  if (!courseCode || !courseName) {
    return res.status(400).json({ error: "courseCode and courseName are required fields" });
  }

  courses[courseIndex] = {
    id,
    courseCode,
    courseName,
    units: units || courses[courseIndex].units,
    instructor: instructor || courses[courseIndex].instructor,
    submittedBy: "Diana Pariñas (Student Number: 423001145)"
  };

  res.status(200).json(courses[courseIndex]);
});

// 5. DELETE /api/courses/:id - Remove a course
app.delete('/api/courses/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.id === id);

  // ID Existence Check (Part 2)
  if (courseIndex === -1) {
    return res.status(404).json({ error: "Course not found" });
  }

  const deletedCourse = courses.splice(courseIndex, 1)[0];
  res.status(200).json({
    message: "Course deleted successfully",
    deletedCourse
  });
});

// --- CENTRALIZED ERROR HANDLER (Part 2) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "An unexpected error occurred."
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});