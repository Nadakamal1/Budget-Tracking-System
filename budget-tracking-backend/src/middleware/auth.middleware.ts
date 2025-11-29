import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

interface JwtPayload {
  userId: string;
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || 'secret';

    const payload = jwt.verify(token, secret) as JwtPayload;
    const user = await User.findById(payload.userId);
    if (!user) return res.status(401).json({ message: 'Unauthorized: User not found' });

    // Attach user to request
    (req as any).user = user;
    next();
  } catch (err: any) {
    return res.status(401).json({ message: 'Unauthorized', error: err.message });
  }
};
