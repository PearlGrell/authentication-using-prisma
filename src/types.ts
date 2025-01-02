import { type Response, type Request } from 'express';

export type Settings = {
    port: number,
    jwtSecret: string,
    db: {
        url: string,
        auth_token: string
    },
    mail: {
        smtp_host: string,
        smtp_port: number,
        smtp_user: string,
        smtp_pass: string
    },
    cors: {
        origin: string,
        methods: string,
        allowedHeaders: string
    }
}

export type User = {
    id?: string,
    firstName: string,
    lastName: string,
    username?: string,
    email: string,
    password?: string,
    dob: string,
    image?: string,
    isVerified?: number,
    isLoggedIn?: number,
    otp?: string,
    salt?: string,
    createdAt?: string,
    updatedAt?: string,
}

export type Context = {
    req: Request,
    res: Response
};