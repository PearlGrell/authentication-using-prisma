import express, { Express } from "express";
import cors from "cors";
import { settings } from "./config/settings";
import { all, current, id } from "./routes/user";
import { create, verify, login, resendOTP, forgotPassword, resetPassword } from "./routes/auth";

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(settings.cors));

// User Routes
app.get("/api/user/all", async (req, res) => await all({req, res}));

app.get("/api/user/current", async (req, res) => await current({req, res}));

app.get("/api/user/:id", async (req, res) => await id({req, res}));

//Auth Routes
app.post("/api/auth/signup", async (req, res) => await create({req, res}));

app.post("/api/auth/verify", async (req, res) => await verify({req, res}));

app.post('/api/auth/verify/resend', async (req, res) => await resendOTP({req, res}));

app.post("/api/auth/login", async (req, res) => await login({req, res}));

app.post("/api/auth/password/forgot", async (req, res) => await forgotPassword({req, res}));

app.post("/api/auth/password/reset", async (req, res) => await resetPassword({req, res}));

app.listen(
    settings.port,
    () => console.log(`Server is running on port ${settings.port}`)
);

export default app;