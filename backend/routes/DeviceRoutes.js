const express = require("express")
const router = express.Router()

// Controller
const { register, getDevices, getDeviceById } = require("../controllers/DeviceController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { deviceCreateValidation } = require("../middlewares/deviceValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.get("/", authGuard, getDevices)
router.get("/:id", authGuard, getDeviceById)
router.post("/register", authGuard, deviceCreateValidation(), validate, register)

module.exports = router