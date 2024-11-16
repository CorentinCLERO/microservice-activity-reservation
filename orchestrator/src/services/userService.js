const axios = require('axios');
const config = require('../config/config');

class UserService {
  async validateToken(token) {
    try {
      const response = await axios.post(`${config.services.users}/auth/validate`, {
        token: token
      });
      return response.data;
    } catch (error) {
      throw new Error('Token validation failed');
    }
  }
}

module.exports = new UserService();