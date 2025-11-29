import { Router } from 'express';
import { createIncome, getIncomes, getIncomeById, updateIncome, deleteIncome } from './income.controller';
import { authenticate } from "../../middleware/auth.middleware";

const router = Router();

router.post('/', authenticate, createIncome);
router.get('/:userId', authenticate, getIncomes);
router.get('/:userId/:id', authenticate, getIncomeById);
router.put('/:id', authenticate, updateIncome);
router.delete('/:id', authenticate, deleteIncome);

export default router;
