import { drizzle } from 'drizzle-orm/postgres-js';
import { postsTable } from './schemas';
import postgres from 'postgres';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL nao configurada');
}

const isLocalDatabase = /localhost|127\.0\.0\.1/.test(databaseUrl);

export const postgresClient = postgres(databaseUrl, {
  prepare: false,
  ssl: isLocalDatabase ? false : 'require',
});

export const drizzleDb = drizzle(postgresClient, {
  schema: {
    posts: postsTable,
  },
  logger: false,
});
