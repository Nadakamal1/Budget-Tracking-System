import { Router } from 'express';
import { getDashboard } from './dashboard.controller';
// import { authenticate } from "../../middleware/auth.middleware";


const router = Router();

router.get('/:userId', getDashboard);

export default router;
