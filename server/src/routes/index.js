import { Router } from 'express';
import convertRoutes from './convert.routes.js';

const router = Router();

router.get('/health', (req, res) => res.json({ ok: true }));
router.use('/api', convertRoutes);

export default router;
