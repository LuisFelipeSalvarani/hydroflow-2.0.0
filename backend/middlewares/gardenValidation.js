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
        // Validação de área
        body("areas")
            .isArray()
            .withMessage("O jardim deve conter pelo menos uma área."),
    ]
}

module.exports = {
    gardenCreateValidation,
}