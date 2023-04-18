import nodemailer from 'nodemailer';
import * as fs from 'fs';
import { HttpException } from '../exceptions/http-exception';

class EmailService {
  private readonly transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      },
    });
  }

  emailTemplate(message: string, url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile('./src/templates/email.html', 'utf8', (err, data) => {
        if (err) {
          reject(err);
        }

        const template = data.replace('{{message}}', message).replace('{{url}}', url).replace('{{url}}', url);
        resolve(template);
      });
    });
  }

  async sendEmail(email: string, subject: string, message: string, url: string) {
    const template = await this.emailTemplate(message, url);

    if (!template) {
      throw new HttpException(500, 'Email template not found')
    }

    // how to add image to email template -> https://stackoverflow.com/questions/20210522/nodejs-nodemailer-gmail-embedded-image-not-displaying

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject,
      text: message,
      html: template
    };

    return this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }

      return info.response;
    });
  }
}

export default new EmailService();
