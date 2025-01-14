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
exports.verify = verify;
exports.resendOTP = resendOTP;
const token_1 = require("../../helpers/token");
const response_1 = require("../../helpers/response");
const database_1 = require("../../database/database");
const schema_1 = require("../../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const user_1 = __importDefault(require("../../models/user"));
function verify(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const { otp } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                response_1.response.error_message(res, "Valid Token Not Found", 401);
                return;
            }
            const id = (0, token_1.verify_token)(token);
            const data = yield database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).get();
            if (!data) {
                response_1.response.error_message(res, "User Not Found", 404);
                return;
            }
            const user = new user_1.default(data);
            if (user.otp !== otp) {
                response_1.response.error_message(res, "Invalid OTP", 400);
                return;
            }
            user.verifyUser();
            user.loginUser();
            yield database_1.db.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).run();
            response_1.response.success(res, "User Verified Successfully", "message");
        }
        catch (err) {
            response_1.response.error(res, err);
        }
    });
}
function resendOTP(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                response_1.response.error_message(res, "Valid Token Not Found", 401);
                return;
            }
            const id = (0, token_1.verify_token)(token);
            const data = yield database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).get();
            if (!data) {
                response_1.response.error_message(res, "User Not Found", 404);
                return;
            }
            const user = new user_1.default(data);
            if (user.isUserVerified()) {
                response_1.response.error_message(res, "User Already Verified", 400);
                return;
            }
            yield user.generateOTP();
            yield database_1.db.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).run();
            response_1.response.success(res, "OTP Sent Successfully", "message");
        }
        catch (err) {
            response_1.response.error(res, err);
        }
    });
}
//# sourceMappingURL=verify.js.map