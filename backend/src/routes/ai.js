const express = require('express')
const router = express.Router()
const { generateFlashcards, summarizeText } = require('../controllers/aiController')

// these must be functions
router.post('/flashcards', generateFlashcards)
router.post('/summarize', summarizeText)

module.exports = router
