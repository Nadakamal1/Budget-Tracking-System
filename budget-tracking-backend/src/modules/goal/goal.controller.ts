import { Request, Response } from 'express';
import Goal from '../../models/goal.model';

export const createGoal = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.create(req.body);
    return res.status(201).json(goal);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find({ userId: req.params.userId });
    return res.status(200).json(goals);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await Goal.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Goal not found' });
    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Goal.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Goal not found' });
    return res.status(204).send();
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
