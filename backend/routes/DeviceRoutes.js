const express = require("express")
const router = express.Router()

// Controller
const { register } = require("../controllers/DeviceController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { deviceCreateValidation } = require("../middlewares/deviceValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.post("/register", authGuard, deviceCreateValidation(), validate, register)

module.exports = router