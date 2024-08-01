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

// Resgate de todos os dispostivos
const getDevices = async (req, res) => {
    const devices = await Device.find({deletedAt: null})

    // Verifica se existe algum dispositivo
    if (!devices) {
        res.status(404).json({errors: "Nenhum dispositivo encontrado."})
        return
    }

    res.status(200).json(devices)
}

// Resgate de dispostivo pelo id
const getDeviceById = async (req, res) => {
    const { id } = req.params

    const device = await Device.findById(id)

    // Checagem da existência do dispositivo e se ele não está marcado como deletado
    if (!device || device.deletedAt) {
        return res.status(404).json({ errors: "Nenhum jardim encontrado." });
    }

    res.status(200).json(device)
}

// Atualizar dispositivo
const update = async (req, res) => {
    const { id, name, serial, areaId, gardenId, description } = req.body

    const device = await Device.findById(id)

    if(!device) {
        res.status(404).json({errors: "Dispositivo não encontrado."})
        return
    }

    if(name) {
        const deviceName = await Device.findOne({ name })

        if(!deviceName.name === device.name) if(deviceName) return res.status(404).json({errors: "Nome de dispostivo já existente."})

        device.name = name
    }

    if(serial) {
        const deviceSerial = await Device.findOne({ serial })

        if(!deviceSerial.serial === device.serial) if(deviceSerial) return res.status(404).json({errors: "Dispostivo já cadastrado."})

        device.serial = serial
    }

    if(gardenId) {
        // Checagem da existência do jardim
        const garden = await Garden.findById(gardenId)

        if(!garden) {
            res.status(422).json({errors: ["Jardim não encontrado."]})
            return
        }

        if(areaId) {
            // Checagem da existência da área
            const area = garden.areas.id(areaId);

            if (!area) {
                return res.status(404).json({ errors: ["Área não encontrada no jardim."] });
            }
        }
    }

    if (description) device.description = description

    await device.save()

    res.status(200).json(device)
}

// Deletar ou restaurar o dispositivo
const deleteOrRestore = async (req, res) => {
    const { id } = req.params

    const device = await Device.findById(id)

    if(!device) {
        res.status(404).json({errors: "Dispositivo não encontrado."})
    }

    // Checa se o dispositivo foi deletado e recupera
    if(device.deletedAt) {
        device.deletedAt = null

        await device.save()

        res.status(200).json(device)
        return
    }

    device.deletedAt = new Date()

    await device.save()

    res.status(200).json(device)
}

module.exports = {
    register,
    getDevices,
    getDeviceById,
    update,
    deleteOrRestore,
}