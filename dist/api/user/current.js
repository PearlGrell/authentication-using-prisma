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
Object.defineProperty(exports, "__esModule", { value: true });
exports.current = current;
const drizzle_orm_1 = require("drizzle-orm");
const database_1 = require("../../database/database");
const schema_1 = require("../../database/schema");
const response_1 = require("../../helpers/response");
const token_1 = require("../../helpers/token");
function current(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            if (!token) {
                response_1.response.error(res, "Token not found", 401);
                return;
            }
            const id = (0, token_1.verify_token)(token);
            const user = yield database_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.id, id)).get();
            if (!user) {
                response_1.response.error(res, "User not found", 404);
                return;
            }
            response_1.response.success(res, (0, response_1.sanitize_user)(user), "user");
        }
        catch (err) {
            response_1.response.error(res, err);
        }
    });
}
//# sourceMappingURL=current.js.map