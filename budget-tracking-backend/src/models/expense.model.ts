import mongoose, { Schema, Document } from 'mongoose';

export interface IExpense extends Document {
  userId: string;
  category: string;
  amount: number;
  date: Date;
  recurring?: boolean;
}

const expenseSchema = new Schema<IExpense>({
  userId: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  recurring: { type: Boolean, default: false }
}, { timestamps: true });

const Expense = mongoose.model<IExpense>('Expense', expenseSchema);
export default Expense;
