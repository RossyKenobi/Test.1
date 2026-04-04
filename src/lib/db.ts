import { neon } from '@neondatabase/serverless';

export const sql = neon(import.meta.env.POSTGRES_URL);
