import { Router } from 'express';
import { authenticate } from "../../middleware/auth.middleware";
import { createBudget, getBudgets, getBudgetById, updateBudget, deleteBudget } from './budget.controller';
const router = Router();

router.post('/', authenticate, createBudget);
router.get('/:userId', authenticate, getBudgets);
router.get('/:userId/:id', authenticate, getBudgetById);
router.put('/:id', authenticate, updateBudget);
router.delete('/:id', authenticate, deleteBudget);

export default router;
