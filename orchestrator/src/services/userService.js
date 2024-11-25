const axios = require('axios');
const config = require('../config/config');

class UserService {
  async validateToken(token) {
    // console.log(token);
    try {
      const response = await axios.post(`http://user-service:3001/auth/validate`, {}, 
      {
        headers: {
          'authorization': token
        }
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error('Token validation failed');
    }
  }
}

module.exports = new UserService();