const express = require('express');
const router = express.Router();
const activitiesRoutes = require('./activities');
const usersRoutes = require('./users');
const { authenticateToken } = require('../middleware/auth');
const config = require('../config/config');
const axios = require('axios');

// Monter les sous-routes
router.use('/activities', activitiesRoutes);
router.use('/users', usersRoutes);

// Route de réservation (vers l'orchestrateur)
router.post('/orchestrate-reservation', authenticateToken, async (req, res) => {
    // console.log(req)
  console.log('🚀 Starting orchestration of reservation');
  console.log('👤 User ID:', req.body.userId);
  console.log('📝 Reservation request data:', {
      ...req.body,
      userId: req.body.userId,
      // Ne pas logger le token pour des raisons de sécurité
      hasToken: !!req.headers.authorization
  });

  try {
      console.log(`🔄 Forwarding request to orchestrator at: ${config.services.orchestrator}/orchestrate-reservation`);
      const response = await axios.post(`${config.services.orchestrator}/orchestrate-reservation`, {
          ...req.body,
          userId: req.body.userId,
          token: req.headers.authorization
      });

      console.log('✅ Reservation orchestration successful');
      console.log('📊 Orchestrator response:', response.data);
      res.json(response.data);
  } catch (error) {
      console.error('❌ Reservation orchestration failed:', {
          status: error.response?.status || 500,
          message: error.response?.data?.message || 'Internal server error',
          error: error.message
      });

      res.status(error.response?.status || 500).json(
          error.response?.data || { message: 'Internal server error' }
      );
  }
});

module.exports = router;