const Garden = require("../models/Garden")

const mongoose = require("mongoose")

// Registro de Jardins e areas
const register = async(req, res) => {
    const { name, size, cep, adress, number, complement, district, city, state, description, areas } = req.body

    // Checagem da existência do jardim
    const garden = await Garden.findOne({ name })

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

// Atualizar Jardim
const update = async(req, res) => {
    const { id, name, size, cep, adress, number, complement, district, city, state, description } = req.body

    const garden = await Garden.findById(new mongoose.Types.ObjectId(id)).select("-areas")

    // Checagem da existência do jardim
    if(!garden) {
        res.status(404).json({errors: ["Jardim não encontrado."]})
        return
    }

    if(!(await Garden.findOne({ name }))) {
        garden.name = name
    } else {
        res.status(404).json({errors: ["Nome de jardim já existente."]})
        return
    }

    if(size) {
        garden.size = size
    }

    if(cep) {
        garden.cep = cep
    }
    
    if(adress) {
        garden.adress = adress
    }
    
    if(number) {
        garden.number = number
    }

    if(complement) {
        garden.complement = complement
    }
    
    if(district) {
        garden.district = district
    }
    
    if(city) {
        garden.city = city
    }
    
    if(state) {
        garden.state = state
    }
    
    if(description) {
        garden.description = description
    }

    await garden.save()

    res.status(200).json(garden)
}

module.exports = {
    register,
    update,
}