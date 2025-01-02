"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generate_token = generate_token;
exports.verify_token = verify_token;
const settings_1 = require("./../config/settings");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generate_token(id) {
    return jsonwebtoken_1.default.sign({ id }, settings_1.settings.jwtSecret, { algorithm: 'HS256' });
}
function verify_token(token) {
    const decoded = jsonwebtoken_1.default.verify(token, settings_1.settings.jwtSecret, { algorithms: ['HS256'] });
    return decoded['id'];
}
//# sourceMappingURL=token.js.map