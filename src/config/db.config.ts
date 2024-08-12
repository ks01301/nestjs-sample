import { registerAs } from '@nestjs/config';

export default registerAs('db', () => ({
  db_type: process.env.DATABASE_TYPE,
  db_host: process.env.DATABASE_HOST as string | 'localhost',
  db_user: process.env.DATABASE_USER,
  db_password: process.env.DATABASE_PASSWORD,
  db_port: process.env.DATABASE_PORT,
  db_db: process.env.DATABASE_DB,
  db_sync: process.env.DATABASE_SYNC || false,
}));
