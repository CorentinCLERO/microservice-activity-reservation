const nodemailer = require('nodemailer');
const config = require('../config/config');
const emailTemplates = require('../templates/emailTemplates');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport(config.email);
    this.initialize();
  }

  async initialize() {
    try {
      await this.transporter.verify();
      logger.info('Email service initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
    }
  }

  async sendEmail(to, subject, template, data) {
    try {
      const html = emailTemplates[template](data);
      
      const mailOptions = {
        from: config.email.auth.user,
        to,
        subject,
        html
      };

      const result = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully to ${to}`);
      return result;
    } catch (error) {
      logger.error(`Failed to send email to ${to}:`, error);
      throw new Error('Failed to send email');
    }
  }
}

module.exports = new EmailService();