import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../../models/user.model';


export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(user);
  } catch (err: any) {
    return res.status(403).json({ error: err.message });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    if (!updated) return res.status(404).json({ error: 'User not found' });

    return res.status(200).json(updated);
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};


export const changeUserPassword = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = bcrypt.compareSync(req.body.currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid current password' });

    const hashedPass = await bcrypt.hash(req.body.newPassword, 10);
    await User.findByIdAndUpdate(req.params.id, { password: hashedPass });

    return res.status(200).json({ message: 'Password changed!' });
  } catch (err: any) {
    return res.status(400).json({ error: err.message });
  }
};


