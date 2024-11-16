require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3005,
  email: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  services: {
    users: process.env.USER_SERVICE_URL || 'http://user-service:3001'
  }
};