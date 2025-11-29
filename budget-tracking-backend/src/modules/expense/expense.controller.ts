import { Request, Response } from 'express';
import Expense from '../../models/expense.model';

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = await Expense.create(req.body);
    return res.status(201).json(expense);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getExpenses = async (req: Request, res: Response) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId });
    return res.status(200).json(expenses);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getExpenseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    return res.status(200).json(expense);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Expense not found' });
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteExpense = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
