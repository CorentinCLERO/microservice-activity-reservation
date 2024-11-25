const axios = require('axios');
const config = require('../config/config');

class ReservationService {
  async createReservation(userId, activityId) {
    try {
      console.log(userId);
      console.log(activityId);
      const response = await axios.post(`${config.services.reservations.url}/reservations`, {
        userId,
        activityId
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to create reservation');
    }
  }

  async cancelReservation(reservationId) {
    try {
      console.log(reservationId);
      const response = await axios.delete(`${config.services.reservations.url}/reservations/${reservationId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to cancel reservation');
    }
  }
}

module.exports = new ReservationService();