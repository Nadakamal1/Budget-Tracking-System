import { Router } from 'express';
import { createExpense, getExpenses, getExpenseById, updateExpense, deleteExpense } from './expense.controller';
import { authenticate } from "../../middleware/auth.middleware";


const router = Router();

router.post('/', authenticate, createExpense);
router.get('/:userId', authenticate, getExpenses);
router.get('/:userId/:id', authenticate, getExpenseById);
router.put('/:id', authenticate, updateExpense);
router.delete('/:id', authenticate, deleteExpense);

export default router;
