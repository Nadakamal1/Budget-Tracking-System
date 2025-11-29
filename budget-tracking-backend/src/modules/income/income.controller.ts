import { Request, Response } from 'express';
import Income from '../../models/income.model';

export const createIncome = async (req: Request, res: Response) => {
  try {
    const income = await Income.create(req.body);
    return res.status(201).json(income);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getIncomes = async (req: Request, res: Response) => {
  try {
    const incomes = await Income.find({ userId: req.params.userId });
    return res.status(200).json(incomes);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getIncomeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const income = await Income.findById(id);
    if (!income) return res.status(404).json({ message: 'Income not found' });
    return res.status(200).json(income);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateIncome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Income.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Income not found' });
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(400).json({ message: err.message });
  }
};

export const deleteIncome = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Income.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Income not found' });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
