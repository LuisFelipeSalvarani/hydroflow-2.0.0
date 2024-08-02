const { body } = require("express-validator")

// Validações do registro de parâmetros
const parameterCreateValidation = () => {
    return [
        // Validação do id do dispositivo
        body("deviceId")
            .isMongoId()
            .withMessage("Dispositivo inválido."),
        // Validação do id da area
        body("areaId")
            .isMongoId()
            .withMessage("Área inválida."),
        // Validação do id do jardim
        body("gardenId")
            .isMongoId()
            .withMessage("Jardim inválida."),
        // Validação da temperatura mínima
        body("minTemp")
            .isInt({min: 0, max: 40})
            .withMessage("Temperatura mínima deve estar entre 0° e 40°.")
            .custom((value, { req }) => {
                if (value > req.body.maxTemp) {
                    throw new Error("A temperatura mínima não deve ser maior que a temperatura máxima.")
                }
                return true
            }),
        // Validação da temperatura máxima
        body("maxTemp")
            .isInt({min: 0, max: 40})
            .withMessage("Temperatura máxima deve estar entre 0° e 40°.")
            .custom((value, { req }) => {
                if (value < req.body.minTemp) {
                    throw new Error("A temperatura máxima não deve ser menor que a temperatura mínima.")
                }
                return true
            }),
        // Validação da umidade mínima
        body("minHumi")
            .isInt({min: 0, max: 100})
            .withMessage("Umidade mínima deve estar entre 0% e 100%.")
            .custom((value, { req }) => {
                if (value > req.body.maxHumi) {
                    throw new Error("A umidade mínima não deve ser maior que a umidade máxima.")
                }
                return true
            }),
        // Validação da umidade máxima
        body("maxHumi")
            .isInt({min: 0, max: 100})
            .withMessage("Umidade máxima deve estar entre 0% e 100%.")
            .custom((value, { req }) => {
                if (value < req.body.minHumi) {
                    throw new Error("A umidade máxima não deve ser menor que a umidade mínima.")
                }
                return true
            }),
        // Validação da vazão mínima
        body("minFlow")
            .isInt({min: 0, max: 300})
            .withMessage("Vazão mínima deve estar entre 0m³ e 300m³.")
            .custom((value, { req }) => {
                if (value > req.body.maxFlow) {
                    throw new Error("A vazão mínima não deve ser maior que a vazão máxima.")
                }
                return true
            }),
        // Validação da vazão máxima
        body("maxFlow")
            .isInt({min: 0, max: 300})
            .withMessage("Vazão máxima deve estar entre 0m³ e 300m³.")
            .custom((value, { req }) => {
                if (value < req.body.minflow) {
                    throw new Error("A vazão máxima não deve ser menor que a vazão mínima.")
                }
                return true
            }),
        // Validação do array de dias 
        body("days")
            .isArray({min: 1})
            .withMessage("É obrigatório selecionar pelo menos 1 dia."),
        body("days.*")
            .isBoolean()
            .withMessage("Os dias devem ser verdadeiros ou falsos.")
    ]
}

module.exports = {
    parameterCreateValidation,
}