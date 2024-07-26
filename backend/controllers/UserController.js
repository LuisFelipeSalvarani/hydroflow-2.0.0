const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwsSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id}, jwsSecret, {
        expiresIn: "7d",
    })
}

const register = async(req, res) => {
    res.send("Registro")
}

module.exports = {
    register,
}