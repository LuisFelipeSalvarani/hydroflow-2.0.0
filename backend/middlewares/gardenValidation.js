const { body } = require("express-validator")

// Validações do registro de jardim
const gardenCreateValidation = () => {
    return [
        // Validação do nome do jardim
        body("name")
            .isString()
            .withMessage("O nome do jardim é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome do jardim precisa ter no mínimo 3 caracteres."),
        // Validação do tamanho
        body("size")
            .isNumeric()
            .withMessage("O tamanho é obrigatório."),
        // Validação do cep
        body("cep")
            .isString()
            .withMessage("O cep é obrigatório."),
        // Validação do endereço
        body("adress")
            .isString()
            .withMessage("O endereço é obrigatório."),
        // Validação do número
        body("number")
            .isNumeric()
            .withMessage("O número é obrigatório.")
            .isInt()
            .withMessage("Número inválido."),
        // Validação do bairro
        body("district")
            .isString()
            .withMessage("O bairro é obrigatório."),
        // Validação do cidade
        body("city")
            .isString()
            .withMessage("A cidade é obrigatória."),
        // Validação do estado
        body("state")
            .isString()
            .withMessage("O estado é obrigatório.")
            .isLength({max: 2})
            .withMessage("Estado inválido"),
        // Validações das áreas
        body("areas")
            .isArray()
            .withMessage("O jardim deve conter pelo menos uma área."),
        // Validação do nome da área
        body("areas.*.name")
            .isString()
            .withMessage("O nome da área é obrigatório."),
        // Validação do tipo de planta da área
        body("areas.*.plantType")
            .isString()
            .withMessage("O tipo de planta é obrigatório.")
    ]
}

// Validações da atualização de jardim
const gardenUpdateValidation = () => {
    return [
        // Validação do id do jardim
        body("id")
            .isString()
            .withMessage("O jardim é obrigatório.")
            .isMongoId()
            .withMessage("jardim inválido."),
        // Validação do nome do jardim
        body("name")
            .isString()
            .withMessage("O nome do jardim é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome do jardim precisa ter no mínimo 3 caracteres."),
        // Validação do tamanho
        body("size")
            .isNumeric()
            .withMessage("O tamanho é obrigatório."),
        // Validação do cep
        body("cep")
            .isString()
            .withMessage("O cep é obrigatório."),
        // Validação do endereço
        body("adress")
            .isString()
            .withMessage("O endereço é obrigatório."),
        // Validação do número
        body("number")
            .isNumeric()
            .withMessage("O número é obrigatório.")
            .isInt()
            .withMessage("Número inválido."),
        // Validação do bairro
        body("district")
            .isString()
            .withMessage("O bairro é obrigatório."),
        // Validação do cidade
        body("city")
            .isString()
            .withMessage("A cidade é obrigatória."),
        // Validação do estado
        body("state")
            .isString()
            .withMessage("O estado é obrigatório.")
            .isLength({max: 2})
            .withMessage("Estado inválido"),
    ]
}

// Validações do registro de jardim
const areaCreateValidation = () => {
    return [
        // Validação do id do jardim
        body("id")
            .isString()
            .withMessage("O jardim é obrigatório.")
            .isMongoId()
            .withMessage("Jardim inválido."),
        // Validações das áreas
        body("areas")
            .isArray()
            .withMessage("Nenhuma área nova encontrada."),
        // Validação do nome da area
        body("areas.*.name")
            .isString()
            .withMessage("O nome da área é obrigatório."),
        // Validação do tipo de planta da área
        body("areas.*.plantType")
            .isString()
            .withMessage("O tipo de planta é obrigatório.")
    ]
}

// Validações da atualização de jardim
const areaUpdateValidation = () => {
    return [
        // Validação do id do jardim
        body("id")
            .isString()
            .withMessage("A área é obrigatória.")
            .isMongoId()
            .withMessage("Área inválida."),
        // Validação do nome da área
        body("name")
            .isString()
            .withMessage("O nome da área é obrigatório."),
        // Validação do tipo de planta da área
        body("plantType")
            .isString()
            .withMessage("O tipo de planta é obrigatório."),
        // Validação do id do jardim
        body("gardenId")
            .isString()
            .withMessage("O jardim é obrigatório.")
            .isMongoId()
            .withMessage("jardim inválido.")
    ]
}

module.exports = {
    gardenCreateValidation,
    gardenUpdateValidation,
    areaCreateValidation,
    areaUpdateValidation,
}