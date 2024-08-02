const express = require("express")
const router = express.Router()

// Controller
const { register } = require("../controllers/ParametersController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { parameterCreateValidation } = require("../middlewares/parametersValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.post("/register", authGuard, parameterCreateValidation(), validate, register)

module.exports = router