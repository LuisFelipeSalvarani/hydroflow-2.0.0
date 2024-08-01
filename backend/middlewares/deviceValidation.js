const { body } = require("express-validator")

// Validações do registro de dispositivo
const deviceCreateValidation = () => {
    return [
        // Validação do nome do jardim
        body("name")
            .isString()
            .withMessage("O nome do jardim é obrigatório."),
        // Validação do serial
        body("serial")
            .isString()
            .withMessage("O serial é obrigatório."),
        // Validação do id da área
        body("areaId")
            .isMongoId()
            .withMessage("Área inválida."),
        // Validação do id do jardim
        body("gardenId")
            .isMongoId()
            .withMessage("Jardim inválido."),
    ]
}

// Validações de atualização de dispositivo
const deviceUpdateValidation = () => {
    return [
        // Validação do id do dispositivo
        body("id")
            .optional()
            .isMongoId()
            .withMessage("Dispositivo inválido"),
        // Validação do nome do jardim
        body("name")
            .optional()
            .isString()
            .withMessage("O nome do jardim é obrigatório."),
        // Validação do serial
        body("serial")
            .optional()
            .isString()
            .withMessage("O serial é obrigatório."),
        // Validação do id da área
        body("areaId")
            .optional()
            .isMongoId()
            .withMessage("Área inválida."),
        // Validação do id do jardim
        body("gardenId")
            .optional()
            .isMongoId()
            .withMessage("Jardim inválido."),
    ]
}

module.exports = {
    deviceCreateValidation,
    deviceUpdateValidation
}