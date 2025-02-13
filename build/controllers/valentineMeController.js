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
exports.default = valentineMe;
const database_1 = __importDefault(require("../database"));
const response_1 = require("../helper/response");
function valentineMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, date_time, coffee } = req.body;
        if (!name || !date_time || !coffee) {
            next(new Error("Input fields required"));
        }
        yield database_1.default.valentine_Me.create({
            data: {
                name,
                coffee,
                date_time
            }
        }).then(() => (0, response_1.response)(res, 200, "Added")).catch(next);
    });
}
//# sourceMappingURL=valentineMeController.js.map