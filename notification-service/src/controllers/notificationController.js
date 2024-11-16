const emailService = require('../services/emailService');
const userService = require('../services/userService');
const logger = require('../utils/logger');

class NotificationController {
  async sendNotification(req, res) {
    const { userId, message, type = 'reservationConfirmation', data = {} } = req.body;

    try {
      // Récupérer l'email de l'utilisateur
      const userEmail = await userService.getUserEmail(userId);

      // Préparer le sujet en fonction du type
      const subjects = {
        reservationConfirmation: 'Confirmation de votre réservation',
        reservationCancellation: 'Annulation de votre réservation'
      };

      // Envoyer l'email
      await emailService.sendEmail(
        userEmail,
        subjects[type] || 'Notification',
        type,
        data
      );

      res.status(200).json({
        success: true,
        message: 'Notification sent successfully'
      });
    } catch (error) {
      logger.error('Failed to send notification:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to send notification',
        error: error.message
      });
    }
  }
}

module.exports = new NotificationController();