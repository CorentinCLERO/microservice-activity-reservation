const userService = require('../services/userService');
const activityService = require('../services/activityService');
const reservationService = require('../services/reservationService');
const notificationService = require('../services/notificationService');

async function orchestrateReservation(req, res) {
  const { userId, activityId, token } = req.body;

  try {
    // 1. Valider le token
    const validationResult = await userService.validateToken(token);
    if (!validationResult.isValid) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // 2. Vérifier la disponibilité de l'activité
    const activity = await activityService.checkAvailability(activityId);
    if (!activity.available) {
      return res.status(400).json({ message: 'Activity not available' });
    }

    // 3. Créer la réservation
    const reservation = await reservationService.createReservation(userId, activityId);

    try {
      // 4. Mettre à jour la disponibilité
      await activityService.updateAvailability(activityId, false);

      // 5. Envoyer la notification
      await notificationService.sendNotification(userId, `Reservation confirmed for activity ${activityId}`);

      res.json({
        message: 'Reservation successful',
        reservationId: reservation.reservationId
      });
    } catch (error) {
      // Compensation en cas d'erreur
      await reservationService.cancelReservation(reservation.reservationId);
      await activityService.updateAvailability(activityId, true);
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error processing reservation',
      error: error.message
    });
  }
}

module.exports = {
  orchestrateReservation
};