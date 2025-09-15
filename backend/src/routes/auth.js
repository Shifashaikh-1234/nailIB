const express = require('express')
const router = express.Router()
const { signup, login } = require('../controllers/authController')

// These must be functions, not undefined
router.post('/signup', signup)
router.post('/login', login)

module.exports = router
