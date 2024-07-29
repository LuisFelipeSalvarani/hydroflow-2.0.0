const express = require("express")
const router = express.Router()

// Controller
const { register, update, registerAreas, updateAreas, deletedOrRestore } = require("../controllers/GardenController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { gardenCreateValidation, gardenUpdateValidation, areaCreateValidation, areaUpdateValidation } = require("../middlewares/gardenValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.post("/register", authGuard, gardenCreateValidation(), validate, register)
router.put("/", authGuard, gardenUpdateValidation(), validate, update)
router.put("/:id", authGuard, adminGuard, deletedOrRestore)
router.put("/areas/register", authGuard, areaCreateValidation(), validate, registerAreas)
router.put("/areas/", authGuard, areaUpdateValidation(), validate, updateAreas)

module.exports = router