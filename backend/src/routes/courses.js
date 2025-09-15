export const getCourses = (req, res) => {
  res.json(courses)
}

export const getCourseById = (req, res) => {
  const course = courses.find(c => c.id === req.params.id)
  if (!course) return res.status(404).json({ error: "Course not found" })
  res.json(course)
}
