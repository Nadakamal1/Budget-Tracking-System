import { Router } from 'express';
import { createGoal, getGoals, updateGoal, deleteGoal } from './goal.controller';

const router = Router();

router.post('/', createGoal);
router.get('/:userId', getGoals);
router.put('/:id', updateGoal);
router.delete('/:id', deleteGoal);

export default router;
