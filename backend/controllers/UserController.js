const User = require("../models/User")

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")

const jwsSecret = process.env.JWT_SECRET

const generateToken = (id) => {
    return jwt.sign({id}, jwsSecret, {
        expiresIn: "7d",
    })
}

// Registro de usuário
const register = async(req, res) => {
    const { username, password, isAdmin } = req.body

    // Checagem da existência do usuário
    const user = await User.findOne({ username })

    if(user) {
        res.status(422).json({errors: ["Nome de usuário já existente."]})
        return
    }

    // Geração do Hash da senha
    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password, salt)

    // Criação do usuário
    const newUser = await User.create({
        username,
        password: passwordHash,
        isAdmin
    })

    // Se o usuário for criado com sucesso, retorna o token
    if(!newUser) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
    }

    res.status(201).json({
        _id: newUser._id,
        token: generateToken(newUser._id)
    })
}

// Login do usuário
const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    // Checagem da existência do usuário
    if(!user) {
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }

    // Checagem se a senha é válida
    if(!(await bcrypt.compare(password, user.password))) {
        res.status(422).json({errors: ["Senha inválida"]})
        return
    }

    // Retorna o token do usuário
    res.status(201).json({
        _id: user._id,
        isAdmin: user.isAdmin,
        token: generateToken(user._id)
    })
}

// Obter o usuário logado atual
const getCurrentUser = async (req, res) => {
    const user = req.user

    res.status(200).json(user)
}

// Atualizar usuário
const update = async (req, res) => {
    const { password, isAdmin } = req.body

    const reqUser = req.user

    const user = await User.findById(new mongoose.Types.ObjectId(reqUser._id)).select("-password")

    if(password) {
        // Geração do Hash da senha
        const salt = await bcrypt.genSalt()
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
    }

    if(isAdmin) {
        user.isAdmin = isAdmin
    }

    await user.save()

    res.status(200).json(user)
}

// Obter usuário pelo id
const getUserById = async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findById(new mongoose.Types.ObjectId(id)).select("-password")

        // Checagem da existência do usuário
        if(!user) {
            res.status(404).json({errors: ["Usuário não encontrado."]})
            return
        }

         res.status(200).json(user)
    } catch (error) {
        res.status(404).json({errors: ["Usuário não encontrado."]})
        return
    }
}

module.exports = {
    register,
    login,
    getCurrentUser,
    update,
    getUserById,
}