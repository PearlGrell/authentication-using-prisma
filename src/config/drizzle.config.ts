import { Config } from "drizzle-kit";
import { settings } from "./settings";

export default {
    dialect: 'turso',
    out: './src/database/migrations',
    schema : './src/database/schema.ts',
    dbCredentials : {
        url : settings.db.url,
        authToken : settings.db.auth_token
    }
} as Config;