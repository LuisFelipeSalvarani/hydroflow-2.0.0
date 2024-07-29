const { Garden } = require("../models/Garden")
const User = require("../models/User")

const mongoose = require("mongoose")

// Registro de Jardins e areas
const register = async(req, res) => {
    const { name, size, cep, adress, number, complement, district, city, state, description, areas } = req.body

    // Checagem da existência do jardim
    const garden = await User.findOne({ name })

    if(garden) {
        res.status(422).json({errors: ["Nome de jardim já existente."]})
        return
    }

    // Criação do jardim
    const newGardem = await Garden.create({
        name,
        size,
        cep,
        adress,
        number,
        complement,
        district,
        city,
        state,
        description,
        areas
    })

    // Se o jardim for criado com sucesso, retorna o id
    if(!newGardem) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
    }

    res.status(201).json({
        _id: newGardem._id,
    })
}

module.exports = {
    register
}