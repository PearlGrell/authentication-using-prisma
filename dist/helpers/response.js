"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response = void 0;
exports.sanitize_user = sanitize_user;
function sanitize_user(user) {
    return {
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        dob: user.dob,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
exports.response = {
    success(res, data, property = "data") {
        res.status(200).json({ [property]: data });
    },
    error(res, error, error_code = 500) {
        res.status(error_code).json({ error: error.message });
    },
    error_message(res, message, error_code = 500) {
        res.status(error_code).json({ error: message });
    },
};
//# sourceMappingURL=response.js.map