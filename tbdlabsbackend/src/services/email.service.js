const nodemailer = require('nodemailer');
const { env } = require('../config/env');
const templates = require('./email.templates');

let transporter;

function getTransporter() {
  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'EMAIL_FROM'].filter((key) => !env[key]);
  if (missing.length) {
    const error = new Error(`Email service is not configured: ${missing.join(', ')}.`);
    error.code = 'SMTP_NOT_CONFIGURED';
    throw error;
  }
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
      pool: true,
      maxConnections: 3,
      maxMessages: 100,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 20000,
    });
  }
  return transporter;
}

async function send({ to, bcc, message }) {
  return getTransporter().sendMail({
    from: env.EMAIL_FROM,
    to,
    ...(bcc?.length ? { bcc } : {}),
    subject: message.subject,
    text: message.text,
    html: message.html,
  });
}

async function sendClientConfirmation({ to, name }) {
  return send({ to, message: templates.clientConfirmationTemplate({ name }) });
}

async function sendStaffInquiryAlert({ recipients, inquiry }) {
  if (!recipients.length) return null;
  return send({
    to: env.EMAIL_FROM,
    bcc: recipients,
    message: templates.staffInquiryTemplate({ inquiry }),
  });
}

async function sendStaffReply({ to, staffName, messageBody, subject }) {
  return send({ to, message: templates.staffReplyTemplate({ to, staffName, messageBody, subject }) });
}

async function sendStaffWelcome({ to, name }) {
  return send({ to, message: templates.staffWelcomeTemplate({ name, email: to }) });
}

function closeEmailTransport() {
  if (transporter) {
    transporter.close();
    transporter = undefined;
  }
}

module.exports = {
  sendClientConfirmation,
  sendStaffInquiryAlert,
  sendStaffReply,
  sendStaffWelcome,
  closeEmailTransport,
};
