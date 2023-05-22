import { createPool } from 'mysql2/promise';
import config from '../config/config';

export const pool = createPool({
  host: config.server.HOST,
  user: config.database.USER,
  password: config.database.PASSWORD,
  database: config.database.DATABASE,
  namedPlaceholders: true,
  decimalNumbers: true,
});
