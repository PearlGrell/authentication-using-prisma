"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.current = exports.id = exports.all = void 0;
const all_1 = require("./../api/user/all");
Object.defineProperty(exports, "all", { enumerable: true, get: function () { return all_1.all; } });
const id_1 = require("./../api/user/id");
Object.defineProperty(exports, "id", { enumerable: true, get: function () { return id_1.id; } });
const current_1 = require("./../api/user/current");
Object.defineProperty(exports, "current", { enumerable: true, get: function () { return current_1.current; } });
//# sourceMappingURL=user.js.map