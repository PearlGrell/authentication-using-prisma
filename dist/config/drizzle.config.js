"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const settings_1 = require("./settings");
exports.default = {
    dialect: 'turso',
    out: './src/database/migrations',
    schema: './src/database/schema.ts',
    dbCredentials: {
        url: settings_1.settings.db.url,
        authToken: settings_1.settings.db.auth_token
    }
};
//# sourceMappingURL=drizzle.config.js.map