const Parameters = require("../models/Parameters")
const Garden = require("../models/Garden")
const Device = require("../models/Device")
const mongoose = require("mongoose")

// Registro de parâmetros
const register = async(req, res) => {
    const { deviceId, areaId, gardenId, startTime, endTime, minTemp, maxTemp, minHumi, maxHumi, minFlow, maxFlow, days } = req.body

    // Verica a existencia do jardim
    const garden = await Garden.findById(gardenId)

    if(!garden) {
        res.status(404).json({errors: "Jardim não encontrado."})
        return
    }

    const area = garden.areas.id(areaId)

    if(!area) {
        res.status(404).json({errors: "Área não encontrada no jardim."})
        return
    }

    const device = await Device.findById(deviceId)

    if(!device) {
        res.status(404).json({errors: "Dispositivo não encontrado."})
        return
    }

    if(device.areaId.toString() !== areaId) {
        res.status(404).json({errors: "Dispositivo não encontrado na área."})
        return
    }

    const parametersDeviceId = await Parameters.findOne({ deviceId })

    if(parametersDeviceId) {
        res.status(404).json({errors: "Dispositivo já possui parâmetros."})
        return
    }

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
        return
    }

    res.status(201).json(newParameters)
}

// Obter parametro pelo id do dispositivo
const getParameterByDeviceId = async (req, res) => {
    const { id } = req.params

    const device = await Device.findById(id)

    if(!device) {
        res.status(404).json({errors: "Dispositivo não encontrado."})
        return
    }

    const parameters = await Parameters.findOne({ deviceId: id, deletedAt: null })

    if(!parameters) {
        res.status(404).json({errors: "Não há parêmetros para esse dispositivo."})
        return
    }

    res.status(200).json(parameters)
}

module.exports = {
    register,
    getParameterByDeviceId,
}