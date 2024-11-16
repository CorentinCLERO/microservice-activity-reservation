const axios = require('axios');
const config = require('../config/config');

class ReservationService {
  async createReservation(userId, activityId) {
    try {
      const response = await axios.post(`${config.services.reservations}/reservations`, {
        userId,
        activityId
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to create reservation');
    }
  }

  async cancelReservation(reservationId) {
    try {
      const response = await axios.delete(`${config.services.reservations}/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to cancel reservation');
    }
  }
}

module.exports = new ReservationService();