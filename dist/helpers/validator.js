"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = validator;
function validator({ firstName, email, dob }) {
    if (!firstName || !email || !dob) {
        return {
            error: new Error('Missing required fields'),
            value: false
        };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return {
            error: new Error('Invalid email address'),
            value: false
        };
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dob)) {
        return {
            error: new Error('Invalid date of birth'),
            value: false
        };
    }
    return {
        error: null,
        value: true
    };
}
//# sourceMappingURL=validator.js.map