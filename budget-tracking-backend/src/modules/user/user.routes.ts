import { Router } from 'express';
import { authenticate } from "../../middleware/auth.middleware";
import {
  getUserProfile,
  updateProfile,
  changeUserPassword
} from './user.controller';

const router = Router();

router.get('/:id', authenticate, getUserProfile);
router.put('/:id', authenticate, updateProfile);
router.put('/:id/change-password', authenticate, changeUserPassword);



export default router;
