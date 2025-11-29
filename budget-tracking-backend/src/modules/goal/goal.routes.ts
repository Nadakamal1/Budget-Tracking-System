import { Router } from 'express';
import { authenticate } from "../../middleware/auth.middleware";

import { createGoal, getGoals, getGoalById, updateGoal, deleteGoal } from './goal.controller';

const router = Router();
router.post('/', authenticate, createGoal);
router.get('/:userId', authenticate, getGoals);
router.get('/:userId/:id', authenticate, getGoalById);
router.put('/:id', authenticate, updateGoal);
router.delete('/:id', authenticate, deleteGoal);

export default router;  
