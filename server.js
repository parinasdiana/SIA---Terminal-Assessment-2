const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory data store with your identification details pre-baked
let courses = [
    {
        id: 1,
        courseCode: "PC24",
        courseName: "System Integration and Architecture 1",
        units: 3,
        instructor: "Mr. Edward James V. Grageda",
        submittedBy: "Diana Pariñas 423001145"
    }
];

// Helper to find course index by ID
const findCourseIndex = (id) => courses.findIndex(c => c.id === parseInt(id));

// 1. GET /api/courses - Get all courses
app.get('/api/courses', (req, res, next) => {
    try {
        res.status(200).json(courses);
    } catch (error) {
        next(error);
    }
});

// 2. GET /api/courses/:id - Get a single course by ID
app.get('/api/courses/:id', (req, res, next) => {
    try {
        const index = findCourseIndex(req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: `Course with ID ${req.params.id} not found.` });
        }
        res.status(200).json(courses[index]);
    } catch (error) {
        next(error);
    }
});

// 3. POST /api/courses - Create a new course
app.post('/api/courses', (req, res, next) => {
    try {
        const { courseCode, courseName, units, instructor } = req.body;

        // Input Validation (Part 2)
        if (!courseCode || !courseName) {
            return res.status(400).json({ error: "Validation Failed: 'courseCode' and 'courseName' are required fields." });
        }

        const newCourse = {
            id: courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1,
            courseCode,
            courseName,
            units: units || 3,
            instructor: instructor || "TBD",
            submittedBy: "Diana Pariñas 423001145"
        };

        courses.push(newCourse);
        res.status(201).json(newCourse);
    } catch (error) {
        next(error);
    }
});

// 4. PUT /api/courses/:id - Replace an entire course
app.put('/api/courses/:id', (req, res, next) => {
    try {
        const index = findCourseIndex(req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: `Modification Failed: Course with ID ${req.params.id} does not exist.` });
        }

        const { courseCode, courseName, units, instructor } = req.body;

        // Input Validation (Part 2)
        if (!courseCode || !courseName) {
            return res.status(400).json({ error: "Validation Failed: 'courseCode' and 'courseName' are mandatory for updates." });
        }

        courses[index] = {
            id: parseInt(req.params.id),
            courseCode,
            courseName,
            units,
            instructor,
            submittedBy: "Diana Pariñas 423001145"
        };

        res.status(200).json(courses[index]);
    } catch (error) {
        next(error);
    }
});

// 5. DELETE /api/courses/:id - Remove a course
app.delete('/api/courses/:id', (req, res, next) => {
    try {
        const index = findCourseIndex(req.params.id);
        if (index === -1) {
            return res.status(404).json({ error: `Deletion Failed: Course with ID ${req.params.id} does not exist.` });
        }

        const deletedCourse = courses.splice(index, 1);
        res.status(200).json({ message: "Course successfully deleted.", data: deletedCourse[0] });
    } catch (error) {
        next(error);
    }
});

// Centralized Error-Handling Middleware (Part 2)
app.use((err, req, res, next) => {
    console.error(err.stack); // Still log inside server console for debugging
    res.status(500).json({
        error: "Internal Server Error",
        message: "Something went wrong on the server side. Please try again later."
    });
});

app.listen(PORT, () => {
    console.log(`Server is happily running on http://localhost:${PORT}`);
});
