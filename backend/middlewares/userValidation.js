const { body } = require("express-validator")

// Validações do registro de usuário
const userCreateValidation = () => {
    return [
        // Validação do nome de usuário
        body("username")
            .isString()
            .withMessage("O nome de usuário é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome de usuário precisa ter no mínimo 3 caracteres."),

        // Validação da senha
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
            .isLength({ min: 8 })
            .withMessage("A senha precisa ter no mínimo 8 caracteres.")
            .custom(value => {
                const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/
                if (!regex.test(value)) {
                    throw new Error('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.')
                }
                return true
            }),

        // Validação da confirmação de senha
        body("confirmpassword")
            .isString()
            .withMessage("A confirmação de senha é obrigatória.")
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("As senhas devem ser iguais.")
                }
                return true
            }),
        // Validação do campo isAdmin
        body("isAdmin")
            .optional()
            .isBoolean()
            .withMessage("O campo isAdmin deve ser um valor booleano."),
    ]
}

// Validações do login de usuário
const loginValidation = () => {
    return [
        // Validação do nome de usuário
        body("username")
            .isString()
            .withMessage("O nome de usuário é obrigatório.")
            .isLength({ min: 3 })
            .withMessage("O nome de usuário inválido."),
        // Validação da senha
        body("password")
            .isString()
            .withMessage("A senha é obrigatória.")
    ]
}

module.exports = {
    userCreateValidation,
    loginValidation,
}