import { Router } from 'express';
import { generateReport, getReports } from './report.controller';

const router = Router();

// POST /reports/generate
router.post('/generate', generateReport);

// GET /reports/:userId
router.get('/:userId', getReports);

export default router;
