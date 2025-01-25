import { CorsOptions } from "cors";

export type Settings = {
    appname: string;
    api_prefix: string;
    server: {
          port: number;
          apiPrefix: string;
    };
    cors: CorsOptions,
    auth: {
          JWT_SECRET: string;
    };
    mail: {
            smtp_host: string;
            smtp_port: number;
            smtp_user: string;
            smtp_pass: string;
    },
    storage: {
            id: string;
            secret: string;
            name: string;
            endpoint: string;
    };
};

export type User = {
    id?: string;
    name: string;
    username?: string;
    email: string;
    password?: string;
    dob: Date;
    image?: string;
    isVerified?: boolean;
    isLoggedIn?: boolean;
    otp?: string;
    salt?: string;
    createdAt?: Date;
    updatedAt?: Date;
};
