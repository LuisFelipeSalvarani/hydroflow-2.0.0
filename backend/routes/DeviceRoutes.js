const express = require("express")
const router = express.Router()

// Controller
const { register, getDevices, getDeviceById, update, deleteOrRestore } = require("../controllers/DeviceController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { deviceCreateValidation, deviceUpdateValidation } = require("../middlewares/deviceValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.get("/", authGuard, getDevices)
router.get("/:id", authGuard, getDeviceById)
router.post("/register", authGuard, deviceCreateValidation(), validate, register)
router.put("/", authGuard, deviceUpdateValidation(), validate, update)
router.put("/:id", authGuard, adminGuard, deleteOrRestore)

module.exports = router