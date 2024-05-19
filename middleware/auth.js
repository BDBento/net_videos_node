// middleware/auth.js
const auth = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).send({ error: 'Access denied. Please log in.' });
    }
};

module.exports = auth;