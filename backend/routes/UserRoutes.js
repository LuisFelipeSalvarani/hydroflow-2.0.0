const express = require("express")
const router = express.Router()

// Controller
const { register, login, getCurrentUser, update, getUserById, deletedOrRestoreById } = require("../controllers/UserController")

// Middlewares
const validate = require("../middlewares/handleValidation")
const { userCreateValidation, loginValidation, userUpdateValidation } = require("../middlewares/userValidation")
const authGuard = require("../middlewares/authGuard")
const adminGuard = require("../middlewares/adminGuard")

// Routes
router.post("/register", authGuard, adminGuard, userCreateValidation(), validate, register)
router.post("/login", loginValidation(), validate, login)
router.get("/profile", authGuard, adminGuard, getCurrentUser)
router.put("/", authGuard, adminGuard, userUpdateValidation(), validate, update)
router.put("/:id", authGuard, adminGuard, deletedOrRestoreById)
router.get("/:id", authGuard, adminGuard, getUserById)

module.exports = router