const Device = require("../models/Device")
const Garden = require("../models/Garden")

const mongoose = require("mongoose")

// Registrar dispositivos
const register = async(req, res) => {
    const { name, serial, areaId, gardenId, description } = req.body

    // Checagem da existência do jardim
    const garden = await Garden.findById(gardenId)

    if(!garden) {
        res.status(422).json({errors: ["Jardim não encontrado."]})
        return
    }

    // Checagem da existência da área
    const area = garden.areas.id(areaId);

    if (!area) {
        return res.status(404).json({ errors: ["Área não encontrada no jardim."] });
    }

    // Checagem da existência do dispositivo
    const device = await Device.findOne({ serial })
    
    if (device) {
        return res.status(404).json({ errors: ["Dispositivo já cadastrado."] });
    }

    // Checagem da existência do nome do dispositivo
    const deviceName = await Device.findOne({ name })
    
    if (deviceName) {
        return res.status(404).json({ errors: ["Nome de dispositivo já existente."] });
    }

    // Criação do dispositivio
    const newDevice = await Device.create({
        name,
        serial,
        areaId,
        gardenId,
        description
    })

    // Se o jardim for criado com sucesso, retorna o id
    if(!newDevice) {
        res.status(422).json({errors: ["Houve um erro, por favor tente mais tarde."]})
    }

    res.status(201).json(newDevice)
}

module.exports = {
    register
}