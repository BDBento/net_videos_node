// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const router = express.Router();

router.post('/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;
    const hashedPassword = await bcrypt.hash(senha, 8);
    try {
        const usuario = await Usuario.create({ nome, email, senha: hashedPassword, excluido: false });
        res.status(201).send(usuario);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email, excluido: false } });
    if (!usuario || !await bcrypt.compare(senha, usuario.senha)) {
        return res.status(401).send({ error: 'Invalid credentials' });
    }
    req.session.userId = usuario.id;
    res.send({ message: 'Logged in successfully' });
});



router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send({ error: 'Could not log out, please try again' });
        }
        res.send({ message: 'Logged out successfully' });
    });
});



module.exports = router;