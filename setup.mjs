import { execSync } from 'child_process';
import * as dotenv from 'dotenv';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: join(__dirname, '.env') });

// Access environment variables
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;

async function restoreDatabase() {
  try {
    execSync(`psql -U ${dbUsername} -d ${dbDatabase} -f ./schema.sql`);
    console.log('Database schema restored successfully');
  } catch (error) {
    console.error('Error restoring database schema:', error);
  }
}

restoreDatabase();
