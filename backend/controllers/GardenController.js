const Garden = require("../models/Garden")

const mongoose = require("mongoose")

// Registrar Jardins e areas
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

// Deletar ou restaurar jardim
const deletedOrRestore = async (req, res) => {
    const { id } = req.params

    try {
        const garden = await Garden.findById(new mongoose.Types.ObjectId(id))

        // Checagem da existência do usuário
        if(!garden) {
            res.status(404).json({errors: ["Jardim não encontrado."]})
            return
        }

        // Checa se o jardim foi deletado e restaura
        if (garden.deletedAt) {
            garden.deletedAt = null;

            // Restaura todas as áreas
            garden.areas.forEach(area => {
                area.deletedAt = null;
            });

            await garden.save();

            return res.status(200).json(garden);
        }

        garden.deletedAt = new Date();

        garden.areas.forEach(area => {
            area.deletedAt = new Date();
        });

        await garden.save()

        res.status(200).json(garden)
    } catch (error) {
        res.status(404).json({errors: ["Erro ao excluir o jardim."]})
        return
    }
}

// Registrar áreas
const registerAreas = async(req, res) => {
    const { id, areas } = req.body

    try {
        // Busca o jardim pelo ID e seleciona apenas o campo areas
        const garden = await Garden.findById(new mongoose.Types.ObjectId(id)).select("areas");

        // Checagem da existência do jardim
        if (!garden) {
            return res.status(404).json({ errors: ["Jardim não encontrado."] });
        }

        // Verificação da existência do nome da área
        for (const newArea of areas) {
            const areaExists = garden.areas.some(area => area.name === newArea.name);
            if (areaExists) {
                return res.status(422).json({ errors: ["Nome de área já existente."] });
            }
        }

        // Adiciona as novas áreas ao jardim
        garden.areas.push(...areas);

        // Salva as alterações no jardim
        await garden.save();

        res.status(201).json(garden);
    } catch (error) {
        res.status(500).json({ errors: ["Erro ao registrar áreas."] });
    }
}

// Atualizar áreas
const updateAreas = async(req, res) => {
    const { id, name, plantType, description, gardenId } = req.body

    try {
        // Busca o jardim pelo ID e seleciona apenas o campo areas
        const garden = await Garden.findById(gardenId).select("areas");

        // Checagem da existência do jardim
        if (!garden) {
            return res.status(404).json({ errors: ["Jardim não encontrado."] });
        }

        // Busca da área específica pelo ID
        const area = garden.areas.id(id);

        // Checagem da existência da área
        if (!area) {
            return res.status(404).json({ errors: ["Área não encontrada no jardim."] });
        }

        // Atualização dos campos da área
        if (name) area.name = name;
        if (plantType) area.plantType = plantType;
        if (description) area.description = description;

        // Salva as alterações no documento do jardim
        await garden.save();

        res.status(200).json(garden);
    } catch (error) {
        res.status(500).json({ errors: ["Erro ao buscar a área."] });
    }
}

// Deletar ou restaurar uma área
const deletedOrRestoreArea = async (req, res) => {
    const { id, gardenId } = req.body

    try {
        // Busca o jardim pelo ID e seleciona apenas o campo areas
        const garden = await Garden.findById(new mongoose.Types.ObjectId(gardenId)).select("areas");

        // Checagem da existência do jardim
        if (!garden) {
            return res.status(404).json({ errors: ["Jardim não encontrado."] });
        }

        // Busca a área específica pelo ID
        const area = garden.areas.id(id);

        // Checagem da existência da área
        if (!area) {
            return res.status(404).json({ errors: ["Área não encontrada no jardim."] });
        }

        // Alterna o estado de deletedAt
        if (area.deletedAt) {
            area.deletedAt = null;

            await garden.save();

            res.status(200).json(garden);
            return
        }
        
        area.deletedAt = new Date();        

        await garden.save();

        res.status(200).json(garden);
    } catch (error) {
        res.status(404).json({errors: ["Erro ao excluir o jardim."]})
        return
    }
}

module.exports = {
    register,
    update,
    deletedOrRestore,
    registerAreas,
    updateAreas,
    deletedOrRestoreArea,
}