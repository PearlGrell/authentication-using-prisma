"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const sqlite_core_1 = require("drizzle-orm/sqlite-core");
exports.users = (0, sqlite_core_1.sqliteTable)('users', {
    id: (0, sqlite_core_1.text)('id').primaryKey().notNull(),
    firstName: (0, sqlite_core_1.text)('first_name').notNull(),
    lastName: (0, sqlite_core_1.text)('last_name').notNull(),
    username: (0, sqlite_core_1.text)('username').notNull(),
    email: (0, sqlite_core_1.text)('email').notNull(),
    password: (0, sqlite_core_1.text)('password'),
    dob: (0, sqlite_core_1.text)('dob').notNull(),
    image: (0, sqlite_core_1.text)('image').notNull(),
    isVerified: (0, sqlite_core_1.integer)('is_verified').default(0).notNull(),
    isLoggedIn: (0, sqlite_core_1.integer)('is_logged_in').default(0).notNull(),
    otp: (0, sqlite_core_1.text)('otp'),
    salt: (0, sqlite_core_1.text)('salt'),
    createdAt: (0, sqlite_core_1.text)('created_at').default('CURRENT_TIMESTAMP').notNull(),
    updatedAt: (0, sqlite_core_1.text)('updated_at').default('CURRENT_TIMESTAMP').notNull(),
});
//# sourceMappingURL=schema.js.map