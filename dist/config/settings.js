"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.settings = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.settings = {
    port: parseInt(process.env.PORT),
    db: {
        url: process.env.URL,
        auth_token: process.env.AUTH_TOKEN
    },
    jwtSecret: process.env.JWT_SECRET,
    mail: {
        smtp_host: process.env.SMTP_HOST,
        smtp_port: parseInt(process.env.SMTP_PORT),
        smtp_user: process.env.SMTP_USER,
        smtp_pass: process.env.SMTP_PASS
    },
    cors: {
        origin: "*",
        methods: "GET, POST, PUT, DELETE",
        allowedHeaders: "Content-Type, Authorization"
    }
};
//# sourceMappingURL=settings.js.map