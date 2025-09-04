import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config(); // load .env here so all imports see env vars

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.resolve(__dirname, '..');        // /server/src
export const UPLOAD_DIR = path.resolve(ROOT, '../uploads'); // /server/uploads

export const PORT = process.env.PORT || 5000;
export const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';
export const CONVERTAPI_SECRET = process.env.CONVERTAPI_SECRET;
