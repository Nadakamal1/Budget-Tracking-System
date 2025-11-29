import { Router } from 'express';
import { generateReport, getReports, getReportById, deleteReport } from './report.controller';
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();
router.post('/generate',authenticate, generateReport);
router.get('/:userId', authenticate, getReports);
router.get('/:userId/:id', authenticate, getReportById);
router.delete('/:userId/:id', authenticate, deleteReport);

export default router; 
