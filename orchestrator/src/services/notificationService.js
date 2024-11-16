const axios = require('axios');
const config = require('../config/config');

class NotificationService {
  async sendNotification(userId, message) {
    try {
      const response = await axios.post(`${config.services.notifications}/notifications`, {
        userId,
        message
      });
      return response.data;
    } catch (error) {
      // On ne lance pas d'erreur ici car la notification est optionnelle
      console.warn('Notification failed to send:', error.message);
      return null;
    }
  }
}

module.exports = new NotificationService();