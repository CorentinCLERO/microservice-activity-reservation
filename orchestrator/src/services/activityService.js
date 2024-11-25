const axios = require('axios');
const config = require('../config/config');

class ActivityService {
  async checkAvailability(activityId) {
    try {
      // console.log(activityId);
      const response = await axios.get(`${config.services.activities.url}/api/activities/${activityId}`);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to check activity availability');
    }
  }

  async updateAvailability(activityId, available) {
    try {
      console.log(activityId);
      console.log(available);
      const response = await axios.patch(`${config.services.activities.url}/api/activities/${activityId}`, {
        'available' : available
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to update activity availability');
    }
  }
}

module.exports = new ActivityService();