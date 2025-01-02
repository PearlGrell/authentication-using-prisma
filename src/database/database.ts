import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';
import { settings } from '../config/settings';

export const db = drizzle({ connection: {
  url: settings.db.url,
  authToken: settings.db.auth_token,
}, schema});
