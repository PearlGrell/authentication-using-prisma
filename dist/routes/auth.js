"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.resendOTP = exports.login = exports.verify = exports.create = void 0;
const signup_1 = require("../api/auth/signup");
Object.defineProperty(exports, "create", { enumerable: true, get: function () { return signup_1.create; } });
const login_1 = require("../api/auth/login");
Object.defineProperty(exports, "login", { enumerable: true, get: function () { return login_1.login; } });
const verify_1 = require("../api/auth/verify");
Object.defineProperty(exports, "verify", { enumerable: true, get: function () { return verify_1.verify; } });
const verify_2 = require("../api/auth/verify");
Object.defineProperty(exports, "resendOTP", { enumerable: true, get: function () { return verify_2.resendOTP; } });
const forgot_password_1 = require("../api/auth/forgot_password");
Object.defineProperty(exports, "forgotPassword", { enumerable: true, get: function () { return forgot_password_1.forgotPassword; } });
const reset_password_1 = require("../api/auth/reset_password");
Object.defineProperty(exports, "resetPassword", { enumerable: true, get: function () { return reset_password_1.resetPassword; } });
//# sourceMappingURL=auth.js.map