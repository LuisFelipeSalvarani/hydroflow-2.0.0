const express = require("express")
const router = express.Router()

// Controller
const { register } = require("../controllers/GardenController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { gardenCreateValidation } = require("../middlewares/gardenValidation")
const authGuard = require("../middlewares/authGuard")

// Routes
router.post("/register", authGuard, gardenCreateValidation(), validate, register)

module.exports = router