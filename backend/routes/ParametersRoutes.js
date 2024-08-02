const express = require("express")
const router = express.Router()

// Controller
const { register, getParameterByDeviceId } = require("../controllers/ParametersController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { parameterCreateValidation } = require("../middlewares/parametersValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.get("/:id", authGuard, getParameterByDeviceId)
router.post("/register", authGuard, parameterCreateValidation(), validate, register)

module.exports = router