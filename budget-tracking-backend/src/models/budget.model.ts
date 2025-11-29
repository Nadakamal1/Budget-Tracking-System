import mongoose, { Schema, Document } from 'mongoose';

export interface IBudget extends Document {
  userId: string;
  month: number;
  year: number;
  categories: { name: string; limit: number }[];
}

const budgetSchema = new Schema<IBudget>({
  userId: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  categories: [
    { name: String, limit: Number }
  ]
}, { timestamps: true });

const Budget = mongoose.model<IBudget>('Budget', budgetSchema);
export default Budget;
