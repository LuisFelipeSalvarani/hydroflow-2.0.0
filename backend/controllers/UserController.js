const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const jwsSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id}, jwsSecret, {
        expiresIn: "7d",
    })
}

// Register user
const register = async(req, res) => {
    const { username, password, isAdmin } = req.body

    // Check if user exists
    const user = await User.findOne({ username })

    if(user) {
        res.status(422).json({errors: ["Nome de usuário já existente."]})
        return
    }

    // Generate password hash
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Create user
    const newUser = await User.create({
        username,
        password: passwordHash,
        isAdmin
    })

    // If user was created successfully, return the token
    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

module.exports = {
    register,
}