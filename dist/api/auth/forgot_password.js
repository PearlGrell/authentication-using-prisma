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
exports.forgotPassword = forgotPassword;
const database_1 = require("../../database/database");
const schema_1 = require("../../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const response_1 = require("../../helpers/response");
const user_1 = __importDefault(require("../../models/user"));
function forgotPassword(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const { email } = req.body;
            const userData = yield database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).get();
            if (!userData)
                return response_1.response.error(res, "User not found", 404);
            const user = new user_1.default(userData);
            yield user.sendPasswordResetEmail();
            yield database_1.db.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).run();
            response_1.response.success(res, "OTP Sent Successfully", "message");
        }
        catch (e) {
            console.error(e);
        }
    });
}
//# sourceMappingURL=forgot_password.js.map