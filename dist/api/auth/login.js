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
exports.login = login;
const database_1 = require("../../database/database");
const schema_1 = require("../../database/schema");
const drizzle_orm_1 = require("drizzle-orm");
const response_1 = require("../../helpers/response");
const user_1 = __importDefault(require("../../models/user"));
function login(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                response_1.response.error_message(res, "Email and Password Required", 400);
                return;
            }
            const data = yield database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).get();
            if (!data) {
                response_1.response.error_message(res, "User Not Found", 404);
                return;
            }
            const user = new user_1.default(data);
            if (!user.isUserVerified()) {
                response_1.response.error_message(res, "User Not Verified", 401);
                return;
            }
            if (!user.verifyPassword(password)) {
                response_1.response.error_message(res, "Invalid Password", 400);
                return;
            }
            user.loginUser();
            yield database_1.db.update(schema_1.users).set(user).where((0, drizzle_orm_1.eq)(schema_1.users.id, user.id)).run();
            response_1.response.success(res, "User Logged In Successfully", "message");
        }
        catch (err) {
            response_1.response.error(res, err.message);
        }
    });
}
//# sourceMappingURL=login.js.map