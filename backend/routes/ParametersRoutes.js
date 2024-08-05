const express = require("express")
const router = express.Router()

// Controller
const { register, getParameterByDeviceId, update } = require("../controllers/ParametersController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { parameterCreateValidation, parameterUpdateValidation } = require("../middlewares/parametersValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.get("/:id", authGuard, getParameterByDeviceId)
router.post("/register", authGuard, parameterCreateValidation(), validate, register)
router.put("/", authGuard, parameterUpdateValidation(), validate, update)

module.exports = router