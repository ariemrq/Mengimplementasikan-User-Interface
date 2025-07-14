const express = require('express')
const { registerValidation, loginValidation } = require('../middlewares/validateUser')
const { register, login } = require('../controllers/authController')
const authRouter = express.Router()

// register
authRouter.post("/register", registerValidation, register)

// login
authRouter.post("/login", loginValidation, login)

module.exports = authRouter