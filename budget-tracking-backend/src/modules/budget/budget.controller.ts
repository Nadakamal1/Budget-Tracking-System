import { Request, Response } from 'express';
import Budget from '../../models/budget.model';

export const createBudget = async (req: Request, res: Response) => {
  try {
    const body: any = { ...req.body };
    // Accept month in formats like "2025-11" or numeric month + year
    if (typeof body.month === 'string' && body.month.includes('-')) {
      const parts = body.month.split('-').map((p: string) => p.trim());
      if (parts.length >= 2) {
        const year = Number(parts[0]);
        const month = Number(parts[1]);
        if (!isNaN(year) && !isNaN(month)) {
          body.year = year;
          body.month = month;
        }
      }
    }
    const budget = await Budget.create(body);
    return res.status(201).json(budget);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getBudgets = async (req: Request, res: Response) => {
  try {
    const budgets = await Budget.find({ userId: req.params.userId });
    return res.status(200).json(budgets);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getBudgetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ message: 'Budget not found' });
    return res.status(200).json(budget);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const body: any = { ...req.body };
    if (typeof body.month === 'string' && body.month.includes('-')) {
      const parts = body.month.split('-').map((p: string) => p.trim());
      if (parts.length >= 2) {
        const year = Number(parts[0]);
        const month = Number(parts[1]);
        if (!isNaN(year) && !isNaN(month)) {
          body.year = year;
          body.month = month;
        }
      }
    }
    const updated = await Budget.findByIdAndUpdate(id, body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Budget not found' });
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteBudget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Budget.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Budget not found' });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
