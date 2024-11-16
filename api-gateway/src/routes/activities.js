const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const axios = require('axios');
const config = require('../config/config');

// Récupérer toutes les activités
router.get('/', async (req, res, next) => {
    try {
        const response = await axios.get(`${config.services.orchestrator.url}/activities`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Récupérer une activité par ID
router.get('/:id', async (req, res, next) => {
    try {
        const response = await axios.get(`${config.services.orchestrator.url}/activities/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Créer une nouvelle activité (admin seulement)
router.post('/', authenticateToken, async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        const response = await axios.post(`${config.services.orchestrator.url}/activities`, req.body);
        res.status(201).json(response.data);
    } catch (error) {
        next(error);
    }
});

// Mettre à jour une activité (admin seulement)
router.put('/:id', authenticateToken, async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        const response = await axios.put(`${config.services.orchestrator.url}/activities/${req.params.id}`, req.body);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

// Supprimer une activité (admin seulement)
router.delete('/:id', authenticateToken, async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        const response = await axios.delete(`${config.services.orchestrator.url}/activities/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        next(error);
    }
});

module.exports = router;