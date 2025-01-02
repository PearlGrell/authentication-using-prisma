import dotenv from 'dotenv';
import { Settings } from '../types';

dotenv.config()

export const settings : Settings = {
    port: parseInt(process.env.PORT!),
    db:{
        url: process.env.URL!,
        auth_token: process.env.AUTH_TOKEN!
    },
    jwtSecret: process.env.JWT_SECRET!,
    mail:{
        smtp_host: process.env.SMTP_HOST!,
        smtp_port: parseInt(process.env.SMTP_PORT!),
        smtp_user: process.env.SMTP_USER!,
        smtp_pass: process.env.SMTP_PASS!
    },
    cors:{
        origin: "*",
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: "Content-Type, Authorization"
    }
}