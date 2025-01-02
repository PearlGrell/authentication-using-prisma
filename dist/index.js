"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const settings_1 = require("./config/settings");
const user_1 = require("./routes/user");
const auth_1 = require("./routes/auth");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)(settings_1.settings.cors));
app.use(express_1.default.static("public"));
// User Routes
app.get("/api/user/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, user_1.all)({ req, res }); }));
app.get("/api/user/current", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, user_1.current)({ req, res }); }));
app.get("/api/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, user_1.id)({ req, res }); }));
//Auth Routes
app.post("/api/auth/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, auth_1.create)({ req, res }); }));
app.post("/api/auth/verify", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, auth_1.verify)({ req, res }); }));
app.post('/api/auth/verify/resend', (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, auth_1.resendOTP)({ req, res }); }));
app.post("/api/auth/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, auth_1.login)({ req, res }); }));
app.post("/api/auth/password/forgot", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, auth_1.forgotPassword)({ req, res }); }));
app.post("/api/auth/password/reset", (req, res) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, auth_1.resetPassword)({ req, res }); }));
app.listen(settings_1.settings.port, () => console.log(`Server is running on port ${settings_1.settings.port}`));
exports.default = app;
//# sourceMappingURL=index.js.map