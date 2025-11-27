import mongoose, { Schema, Document } from 'mongoose';

export interface IGoal extends Document {
  userId: string;
  title: string;
  description?: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: Date;
}

const goalSchema = new Schema<IGoal>({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true, default: 0 },
  targetDate: { type: Date },
}, { timestamps: true });

const Goal = mongoose.model<IGoal>('Goal', goalSchema);
export default Goal;
