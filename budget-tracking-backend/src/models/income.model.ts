import mongoose, { Schema, Document } from 'mongoose';

export interface IIncome extends Document {
  userId: string;
  source: string;
  amount: number;
  date: Date;
}

const incomeSchema = new Schema<IIncome>({
  userId: { type: String, required: true },
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
}, { timestamps: true });

const Income = mongoose.model<IIncome>('Income', incomeSchema);
export default Income;
