"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const nodemailer_1 = __importDefault(require("nodemailer"));
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
//which user acess the course so give acctivate email on current user email
const sendMail = async (options) => {
    // const transporter: Transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: parseInt(process.env.SMTP_PORT || "587"),
    //   service: process.env.SMTP_SERVICE,
    //   auth: {
    //     user: process.env.SMTP_EMAIL, //5440
    //     pass: process.env.SMTP_PASSWORD,
    //     // username: process.env.SMTP_NAME,
    //   },
    // });
    const transporter = nodemailer_1.default.createTransport({
        service: "gmail",
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    const { email, subject, template, data } = options;
    const templatePath = path_1.default.join(__dirname, "../mails", template);
    const html = await ejs_1.default.renderFile(templatePath, data);
    // const mailOptions = {
    //   from: process.env.SMTP_EMAIL,
    //   to: email,
    //   subject,
    //   html,
    // };
    const mailOptions = {
        from: process.env.SMTP_EMAIL,
        to: email,
        subject,
        html,
    };
    await transporter.sendMail(mailOptions);
};
exports.default = sendMail;
