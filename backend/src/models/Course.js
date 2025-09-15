const express = require("express")
const router = express.Router()
const { getCourses, getCourseById } = require("../controllers/courseController")

// GET /api/courses
router.get("/", getCourses)

// GET /api/courses/:id
router.get("/:id", getCourseById)

module.exports = router
