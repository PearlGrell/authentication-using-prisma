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
exports.create = create;
const database_1 = require("../../database/database");
const response_1 = require("../../helpers/response");
const validator_1 = require("../../helpers/validator");
const schema_1 = require("../../database/schema");
const user_1 = __importDefault(require("../../models/user"));
const token_1 = require("../../helpers/token");
const drizzle_orm_1 = require("drizzle-orm");
function query_users(email) {
    return database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email)).all();
}
function create(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const { firstName, lastName, email, dob } = yield req.body;
            const validate = (0, validator_1.validator)({ firstName, lastName, email, dob });
            if (!validate.value) {
                return response_1.response.error(res, validate.error, 400);
            }
            const existingUsers = yield query_users(email);
            if (existingUsers.some((user) => user.email === email)) {
                response_1.response.error_message(res, `User with email '${email}' already exists`, 400);
                return;
            }
            const user = new user_1.default({ firstName, lastName, email, dob });
            yield user.setPassword(`${firstName}_${lastName}_${dob.split("-")[0]}`);
            const token = (0, token_1.generate_token)(user.id);
            const result = yield database_1.db.insert(schema_1.users).values(user.database()).returning();
            if (result.length === 0) {
                response_1.response.error_message(res, "User could not be created", 500);
                return;
            }
            response_1.response.success(res, token, "token");
        }
        catch (err) {
            response_1.response.error(res, err, 500);
        }
    });
}
//# sourceMappingURL=signup.js.map