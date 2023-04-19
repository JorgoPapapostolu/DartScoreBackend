import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { DATABASE_URL } = process.env;

const pool = new Pool({ connectionString: DATABASE_URL });

export default pool