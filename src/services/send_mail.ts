import nodemailer, { SendMailOptions } from 'nodemailer';
import fs from 'node:fs';
import path from 'node:path';
import { settings } from '../config/settings';

const mode = {
    registration: 'registration.html',
    forgot_password: 'forgot_password.html',
    resendOTP: 'resend_otp.html',
}

export type template = keyof typeof mode;

export type params = {
    registration: { otp: string, firstname: string, username: string, password: string };
    forgot_password: { otp: string, firstname: string };
    resendOTP: { otp: string, firstname: string };
};

type mail = {
    to: string;
    template: template;
} & params[template];

const sendMail = async ({ to, template, ...props }: mail) => {
    try {
        const htmlFilePath = path.join('public', 'templates', mode[template]);
        const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');

        let updatedHtmlContent = Object.entries(props).reduce(
            (content, [key, value]) => content.replace(new RegExp(`{{${key.toUpperCase()}}}`, 'g'), value), htmlContent
        );

        const mailOptions: SendMailOptions = {
            from: {
                name: 'Sayble',
                address: "noreply@sayble",
            },
            to,
            subject: `${(template === 'registration') ? "Thank You For Registering" : (template === 'forgot_password') ? "Reset Password" : "Resend OTP"}`,
            html: updatedHtmlContent,
            date: new Date(),
            encoding: 'utf8',
            watchHtml: updatedHtmlContent,
        };

        const transporter = await nodemailer.createTransport({
            host: settings.mail.smtp_host,
            port: settings.mail.smtp_port,
            secure: false,
            auth: {
                user: settings.mail.smtp_user,
                pass: settings.mail.smtp_pass,
            },
        });

        const info = await transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
    }
}

export { sendMail };