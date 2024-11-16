const express = require('express');
const cors = require('cors');
const notificationController = require('./controllers/notificationController');
const errorHandler = require('./utils/errorHandler');
const logger = require('./utils/logger');
const config = require('./config/config');

const app = express();

app.use(cors());
app.use(express.json());

// Route pour envoyer des notifications
app.post('/notifications', (req, res) => {
  notificationController.sendNotification(req, res);
});

// Healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Notification service running on port ${PORT}`);
});