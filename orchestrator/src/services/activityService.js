const axios = require('axios');
const config = require('../config/config');

class ActivityService {
  async checkAvailability(activityId) {
    try {
      const response = await axios.get(`${config.services.activities}/activities/${activityId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to check activity availability');
    }
  }

  async updateAvailability(activityId, available) {
    try {
      const response = await axios.patch(`${config.services.activities}/activities/${activityId}`, {
        available
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update activity availability');
    }
  }
}

module.exports = new ActivityService();