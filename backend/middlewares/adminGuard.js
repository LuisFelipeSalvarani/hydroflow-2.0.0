const adminGuard = (req, res, next) => {
    // Verifique se o usuário está disponível na requisição (adicionado pelo authGuard)
    if (req.user && req.user.isAdmin) {
        return next()
    } else {
        return res.status(403).json({ errors: ["Acesso negado. Somente administradores podem realizar esta ação."] });
    }
};

module.exports = adminGuard;