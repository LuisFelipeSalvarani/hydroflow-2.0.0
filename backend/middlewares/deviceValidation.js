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

module.exports = {
    deviceCreateValidation,
}