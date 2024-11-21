const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const axios = require('axios');
const config = require('../config/config');

// Récupérer toutes les activités
router.get('/', async (req, res, next) => {
    console.log('🚀 Starting fetch of all activities');
    try {
        console.log(`🔄 Attempting to reach activity service at: ${config.services.activities}/api/activities`);
        const response = await axios.get(`${config.services.activities}/api/activities`);
        console.log('✅ Successfully retrieved activities list');
        console.log(`📊 Number of activities retrieved: ${response.data.length}`);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Failed to fetch activities:', error.message);
        next(error);
    }
});

// Récupérer une activité par ID
router.get('/:id', async (req, res, next) => {
    console.log('🚀 Starting fetch of single activity');
    console.log('🔍 Activity ID requested:', req.params.id);
    try {
        console.log(`🔄 Attempting to reach activity service at: ${config.services.activities}/api/activities/${req.params.id}`);
        const response = await axios.get(`${config.services.activities}/api/activities/${req.params.id}`);
        console.log('✅ Successfully retrieved activity');
        console.log('📝 Activity details:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error(`❌ Failed to fetch activity ${req.params.id}:`, error.message);
        next(error);
    }
});

// Créer une nouvelle activité (admin seulement)
router.post('/', authenticateToken, async (req, res, next) => {
    console.log('🚀 Starting activity creation process');
    console.log('👤 User role:', req.user.role);
    console.log('📝 Activity data:', req.body);
    try {
        if (req.user.role !== 'admin') {
            console.warn('⚠️ Unauthorized creation attempt by non-admin user');
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        console.log(`🔄 Attempting to create activity at: ${config.services.activities}/api/activities`);
        const response = await axios.post(`${config.services.activities}/api/activities`, req.body);
        console.log('✅ Activity created successfully');
        console.log('📝 Created activity:', response.data);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('❌ Activity creation failed:', error.message);
        next(error);
    }
});

// Mettre à jour une activité (admin seulement)
router.put('/:id', authenticateToken, async (req, res, next) => {
    console.log('🚀 Starting activity update process');
    console.log('🔍 Activity ID to update:', req.params.id);
    console.log('👤 User role:', req.user.role);
    console.log('📝 Update data:', req.body);
    try {
        if (req.user.role !== 'admin') {
            console.warn('⚠️ Unauthorized update attempt by non-admin user');
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        console.log(`🔄 Attempting to update activity at: ${config.services.activities}/api/activities/${req.params.id}`);
        const response = await axios.put(`${config.services.activities}/api/activities/${req.params.id}`, req.body);
        console.log('✅ Activity updated successfully');
        console.log('📝 Updated activity:', response.data);
        res.json(response.data);
    } catch (error) {
        console.error(`❌ Failed to update activity ${req.params.id}:`, error.message);
        next(error);
    }
});

// Supprimer une activité (admin seulement)
router.delete('/:id', authenticateToken, async (req, res, next) => {
    console.log('🚀 Starting activity deletion process');
    console.log('🔍 Activity ID to delete:', req.params.id);
    console.log('👤 User role:', req.user.role);
    try {
        if (req.user.role !== 'admin') {
            console.warn('⚠️ Unauthorized deletion attempt by non-admin user');
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        console.log(`🔄 Attempting to delete activity at: ${config.services.activities}/api/activities/${req.params.id}`);
        const response = await axios.delete(`${config.services.activities}/api/activities/${req.params.id}`);
        console.log('✅ Activity deleted successfully');
        res.json(response.data);
    } catch (error) {
        console.error(`❌ Failed to delete activity ${req.params.id}:`, error.message);
        next(error);
    }
});

module.exports = router;