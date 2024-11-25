require('dotenv').config();

const config = {
    port: process.env.PORT || 3004,
    services: {
        users: {
            url: process.env.USER_SERVICE_URL || 'http://user-service:3001'
        },
        activities: {
            url: process.env.ACTIVITY_SERVICE_URL || 'http://activity-service:3002'
        },
        notifications: {
            url: process.env.NOTIFICATION_SERVICE_URL || 'http://notification-service:3005'
        },
        reservations: {
            url: process.env.RESERVATION_SERVICE_URL || 'http://reservations-service:3003'
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'your_secret_here',
        expiresIn: '24h'
    },
    redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: process.env.REDIS_PORT || 6379
    }
};

module.exports = config;