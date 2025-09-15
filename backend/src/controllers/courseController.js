// In real app this would fetch from MongoDB, here it's static sample data.
const courses = [
  { id: "1", title: "IB Math HL", description: "Higher Level Math with practice papers" },
  { id: "2", title: "IB Biology SL", description: "Standard Level Biology resources and AI flashcards" },
  { id: "3", title: "IB English A", description: "English Literature notes and summaries" },
]

exports.getCourses = (req, res) => {
  res.json(courses)
}

exports.getCourseById = (req, res) => {
  const course = courses.find(c => c.id === req.params.id)
  if (!course) return res.status(404).json({ error: "Course not found" })
  res.json(course)
}
