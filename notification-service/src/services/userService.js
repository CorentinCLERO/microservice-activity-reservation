const axios = require('axios');
const config = require('../config/config');
const logger = require('../utils/logger');

class UserService {
  async getUserEmail(userId) {
    try {
      const response = await axios.get(`${config.services.users}/users/${userId}`);
      return response.data.email;
    } catch (error) {
      logger.error(`Failed to get user email for userId ${userId}:`, error);
      throw new Error('Failed to get user email');
    }
  }
}

module.exports = new UserService();