require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'microservice',
  services: {
    users: process.env.USER_SERVICE_URL || 'http://user-service:3001',
    activities: process.env.ACTIVITY_SERVICE_URL || 'http://activity-service:3002',
    reservations: process.env.RESERVATION_SERVICE_URL || 'http://reservation-service:3003',
    orchestrator: process.env.ORCHESTRATOR_URL || 'http://orchestrator:3004',
  }
};