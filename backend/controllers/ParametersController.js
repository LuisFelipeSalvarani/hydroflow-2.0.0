const Parameters = require("../models/Parameters")
const mongoose = require("mongoose")

// Registro de parâmetros
const register = async(req, res) => {
    const { deviceId, areaId, gardenId, startTime, endTime, minTemp, maxTemp, minHumi, maxHumi, minFlow, maxFlow, days } = req.body

    // Criação do parâmetro
    const newParameters = await Parameters.create({
        deviceId,
        areaId,
        gardenId,
        startTime,
        endTime,
        minTemp,
        maxTemp,
        minHumi,
        maxHumi,
        minFlow,
        maxFlow,
        days
    })

    // Se o usuário for criado com sucesso, retorna o token
    if(!newParameters) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
    }

    res.status(201).json(newParameters)
}

module.exports = {
    register,
}