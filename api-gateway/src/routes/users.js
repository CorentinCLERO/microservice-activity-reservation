const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const axios = require('axios');
const config = require('../config/config');

// Inscription
router.post('/register', async (req, res, next) => {
    console.log('🚀 Starting registration process');
    console.log('📝 Request body:', req.body);
    try {
        console.log(`🔄 Attempting to reach user service at: ${config.services.users}/users`);
        const response = await axios.post(`${config.services.users}/users`, req.body);
        console.log('✅ Registration successful:', response.data);
        res.status(201).json(response.data);
    } catch (error) {
        console.error('❌ Registration failed:', error.message);
        next(error);
    }
});

// Connexion
router.post('/login', async (req, res, next) => {
    console.log('🚀 Starting login process');
    console.log('📝 Login attempt for user:', req.body.email);
    try {
        console.log(`🔄 Attempting to reach user service at: ${config.services.users}/auth/login`);
        const response = await axios.post(`${config.services.users}/auth/login`, req.body);
        console.log('✅ Login successful for user:', req.body.email);
        res.json(response.data);
    } catch (error) {
        console.error('❌ Login failed:', error.message);
        next(error);
    }
});

// Récupérer le profil utilisateur
router.get('/profile', authenticateToken, async (req, res, next) => {
    console.log('🚀 Fetching user profile');
    console.log('👤 User ID:', req.user.id);
    try {
        console.log('🔄 Sending request to user service for profile data');
        const response = await axios.get(`${config.services.users}/users/profile`, {
            headers: { Authorization: req.headers.authorization }
        });
        console.log('✅ Profile retrieved successfully');
        res.json(response.data);
    } catch (error) {
        console.error('❌ Profile fetch failed:', error.message);
        next(error);
    }
});

// Mettre à jour le profil utilisateur
router.put('/profile', authenticateToken, async (req, res, next) => {
    console.log('🚀 Starting profile update');
    console.log('👤 User ID:', req.user.id);
    console.log('📝 Update data:', req.body);
    try {
        console.log('🔄 Sending update request to user service');
        const response = await axios.put(`${config.services.users}/users/profile`, req.body, {
            headers: { Authorization: req.headers.authorization }
        });
        console.log('✅ Profile updated successfully');
        res.json(response.data);
    } catch (error) {
        console.error('❌ Profile update failed:', error.message);
        next(error);
    }
});

// Liste des utilisateurs (admin seulement)
router.get('/', authenticateToken, async (req, res, next) => {
    console.log('🚀 Fetching users list');
    console.log('👤 Requesting user role:', req.user.role);
    try {
        if (req.user.role !== 'admin') {
            console.warn('⚠️ Unauthorized access attempt by non-admin user');
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        console.log('🔄 Requesting users list from user service');
        const response = await axios.get(`${config.services.users}/users`);
        console.log('✅ Users list retrieved successfully');
        res.json(response.data);
    } catch (error) {
        console.error('❌ Users list fetch failed:', error.message);
        next(error);
    }
});

// Supprimer un utilisateur (admin seulement)
router.delete('/:id', authenticateToken, async (req, res, next) => {
    console.log('🚀 Starting user deletion process');
    console.log('👤 Target user ID:', req.params.id);
    console.log('🔑 Requesting user role:', req.user.role);
    try {
        if (req.user.role !== 'admin') {
            console.warn('⚠️ Unauthorized deletion attempt by non-admin user');
            return res.status(403).json({ message: 'Accès non autorisé' });
        }
        console.log('🔄 Sending deletion request to user service');
        const response = await axios.delete(`${config.services.users}/users/${req.params.id}`);
        console.log('✅ User deleted successfully');
        res.json(response.data);
    } catch (error) {
        console.error('❌ User deletion failed:', error.message);
        next(error);
    }
});

module.exports = router;