import { Request, Response } from 'express';
import User from '../../models/user.model';
import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    return res.status(201).json(user);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const secret = process.env.JWT_SECRET || 'secret';
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: '1d' });
    return res.status(200).json({ token, user });
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
