"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs = __importStar(require("fs"));
const http_exception_1 = require("../exceptions/http-exception");
class EmailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
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
    emailTemplate(message, url) {
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
    async sendEmail(email, subject, message, url) {
        const template = await this.emailTemplate(message, url);
        if (!template) {
            throw new http_exception_1.HttpException(500, 'Email template not found');
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
            }
            else {
                console.log('Email sent: ' + info.response);
            }
            return info.response;
        });
    }
}
exports.default = new EmailService();
