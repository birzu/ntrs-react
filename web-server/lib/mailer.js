const path = require('path');
const pug = require('pug');
const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_AUTH_USER,
  SMTP_AUTH_PASSWORD,
  SENDGRID_PASSWORD,
  SENDGRID_USER
} = process.env;

class Mailer {
  constructor(recipient, subject) {
    this.recipient = recipient;
    this.subject = subject;
  }

  createTransport() {
    let transport;
    if (process.env.NODE_ENV === 'development') {
      transport = nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        auth: {
          user: SMTP_AUTH_USER,
          pass: SMTP_AUTH_PASSWORD
        }
      });
      return transport;
    }
    transport = nodemailer.createTransport({
      service: 'SendGrid',
      auth: {
        user: SENDGRID_USER,
        pass: SENDGRID_PASSWORD
      }
    });
    return transport;
  }

  async send(template, options) {
    const html = pug.renderFile(
      path.resolve(__dirname, '..', 'templates', `${template}.pug`),
      {
        username: this.recipient.username,
        url: options.url,
        subject: this.subject
      }
    );
    this.createTransport().sendMail({
      from: 'support@tours.natours.com',
      to: this.recipient.email,
      subject: this.subject,
      html,
      text: htmlToText.fromString(html)
    });
  }

  async sendWelcome(options) {
    await this.send('welcome', options);
  }

  async sendPasswordReset(options) {
    await this.send('password-reset', options);
  }
}

module.exports = Mailer;
