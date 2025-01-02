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
exports.all = all;
const database_1 = require("./../../database/database");
const schema_1 = require("./../../database/schema");
const response_1 = require("./../../helpers/response");
function all(_a) {
    return __awaiter(this, arguments, void 0, function* ({ req, res }) {
        try {
            const users_ = yield database_1.db.select().from(schema_1.users).all();
            if (users_.length === 0) {
                response_1.response.error_message(res, "No users found", 404);
                return;
            }
            const users = users_.map(response_1.sanitize_user);
            response_1.response.success(res, users, "users");
        }
        catch (err) {
            response_1.response.error(res, err);
        }
    });
}
//# sourceMappingURL=all.js.map