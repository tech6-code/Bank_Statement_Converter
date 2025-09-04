import { Router } from 'express';
import { upload } from '../middleware/upload.middleware.js';
import { convert } from '../controllers/convert.controller.js';

const router = Router();
router.post('/convert', upload.single('file'), convert);

export default router;
