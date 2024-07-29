const express = require("express")
const router = express.Router()

// Controller
const { register, update } = require("../controllers/GardenController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { gardenCreateValidation, gardenUpdateValidation } = require("../middlewares/gardenValidation")
const authGuard = require("../middlewares/authGuard")

// Routes
router.post("/register", authGuard, gardenCreateValidation(), validate, register)
router.put("/", authGuard, gardenUpdateValidation(), validate, update)

module.exports = router