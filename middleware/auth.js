// middleware/auth.js
const auth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send({ error: 'vc ainda nao esta logado' });
    }
};

module.exports = auth;