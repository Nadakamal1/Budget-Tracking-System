import { Request, Response } from 'express';
import Income from '../../models/income.model';
import Expense from '../../models/expense.model';
import Goal from '../../models/goal.model';

export const getDashboard = async (req: Request, res: Response) => {
  const userId = req.params.userId;

  try {
    const incomes = await Income.find({ userId });
    const expenses = await Expense.find({ userId });
    const goals = await Goal.find({ userId });

    const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    const goalProgress = goals.map(g => ({
      title: g.title,
      progress: ((g.currentAmount || 0) / g.targetAmount) * 100,
    }));

    return res.status(200).json({
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
      goalProgress,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
