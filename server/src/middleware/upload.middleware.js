import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { UPLOAD_DIR } from '../config/index.js';

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const safe = file.originalname.replace(/[^\w.\-]+/g, '_');
    cb(null, `${Date.now()}_${safe}`);
  }
});

const fileFilter = (req, file, cb) => {
  const isPdf =
    (file.mimetype && file.mimetype.toLowerCase() === 'application/pdf') ||
    (file.originalname && file.originalname.toLowerCase().endsWith('.pdf'));
  if (!isPdf) return cb(new Error('Only PDF files are allowed'));
  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB
});
