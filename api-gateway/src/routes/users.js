const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const axios = require('axios');
const config = require('../config/config');

// Inscription
router.post('/register', async (req, res, next) => {
    try {
        console.log('Attempting to reach user service at:', `${config.services.users}/users`);
        const response = await axios.post(`${config.services.users}/users`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        next(error);
    }
});

// Connexion
router.post('/login', async (req, res, next) => {
    try {
        console.log('Attempting to reach user service at:', `${config.services.users}/auth/login`);
        const response = await axios.post(`${config.services.users}/auth/login`, req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Récupérer le profil utilisateur
router.get('/profile', authenticateToken, async (req, res, next) => {
    try {
        const response = await axios.get(`${config.services.users}/users/profile`, {
            headers: { Authorization: req.headers.authorization }
        });
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Mettre à jour le profil utilisateur
router.put('/profile', authenticateToken, async (req, res, next) => {
    try {
        const response = await axios.put(`${config.services.users}/users/profile`, req.body, {
            headers: { Authorization: req.headers.authorization }
        });
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Liste des utilisateurs (admin seulement)
router.get('/', authenticateToken, async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        const response = await axios.get(`${config.services.users}/users`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Supprimer un utilisateur (admin seulement)
router.delete('/:id', authenticateToken, async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        const response = await axios.delete(`${config.services.users}/users/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;