import { Request, Response } from 'express';
import Report, { IReport, ReportType } from '../../models/report.model';
import Income from '../../models/income.model';
import Expense from '../../models/expense.model';
import Budget from '../../models/budget.model';
import Goal from '../../models/goal.model';

export const generateReport = async (req: Request, res: Response) => {
  try {
    const { userId, type, startDate, endDate } = req.body;

    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date();

    let data: any = {};

    switch (type as ReportType) {
      case 'income-expense':
        const totalIncomeAgg = await Income.aggregate([
          { $match: { userId, date: { $gte: start, $lte: end } } },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        const totalExpensesAgg = await Expense.aggregate([
          { $match: { userId, date: { $gte: start, $lte: end } } },
          { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);
        data = {
          totalIncome: totalIncomeAgg[0]?.total || 0,
          totalExpenses: totalExpensesAgg[0]?.total || 0,
          balance: (totalIncomeAgg[0]?.total || 0) - (totalExpensesAgg[0]?.total || 0)
        };
        break;

      case 'budget-variance':
        const budgets = await Budget.find({ userId });
        const expenses = await Expense.find({ userId, date: { $gte: start, $lte: end } });
        data = budgets.map(budget => {
          const expensesByCategory: Record<string, number> = {};
          budget.categories.forEach(cat => { expensesByCategory[cat.name] = 0; });
          expenses.forEach(exp => {
            if (expensesByCategory[exp.category] !== undefined) {
              expensesByCategory[exp.category] += exp.amount;
            }
          });
          return budget.categories.map(cat => ({
            category: cat.name,
            budgeted: cat.limit,
            spent: expensesByCategory[cat.name],
            variance: cat.limit - expensesByCategory[cat.name]
          }));
        });
        break;

      case 'savings-progress':
        const goals = await Goal.find({ userId });
        data = goals.map(goal => ({
          title: goal.title,
          targetAmount: goal.targetAmount,
          currentAmount: goal.currentAmount,
          progress: ((goal.currentAmount / goal.targetAmount) * 100).toFixed(2) + '%'
        }));
        break;

      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }

    const report: IReport = await Report.create({
      userId,
      type,
      title: `${type} report`,
      generatedAt: new Date(),
      data
    });

    return res.status(201).json(report);

  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

// Optional: get all reports for a user
export const getReports = async (req: Request, res: Response) => {
  try {
    const reports = await Report.find({ userId: req.params.userId }).sort({ generatedAt: -1 });
    return res.status(200).json(reports);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
