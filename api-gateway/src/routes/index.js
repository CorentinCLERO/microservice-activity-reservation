const express = require('express');
const router = express.Router();
const activitiesRoutes = require('./activities');
const usersRoutes = require('./users');
const { authenticateToken } = require('../middleware/auth');

// Monter les sous-routes
router.use('/activities', activitiesRoutes);
router.use('/users', usersRoutes);

// Route de réservation (vers l'orchestrateur)
router.post('/orchestrate-reservation', authenticateToken, async (req, res) => {
  try {
    const response = await axios.post(`${config.services.orchestrator}/orchestrate-reservation`, {
      ...req.body,
      userId: req.user.id,
      token: req.headers.authorization
    });
    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || { message: 'Internal server error' });
  }
});

module.exports = router;