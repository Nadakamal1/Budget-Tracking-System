// src/models/report.model.ts
import { Schema, model, Document } from 'mongoose';

// Define types
export type ReportType = 'income-expense' | 'budget-variance' | 'savings-progress';

export interface IReport extends Document {
  userId: string;
  type: ReportType;
  title: string;
  generatedAt: Date;
  data: any;
}

// Mongoose schema
const reportSchema = new Schema<IReport>({
  userId: { type: String, required: true },
  type: { type: String, enum: ['income-expense', 'budget-variance', 'savings-progress'], required: true },
  title: { type: String, required: true },
  generatedAt: { type: Date, default: Date.now },
  data: { type: Schema.Types.Mixed, required: true },
});

const Report = model<IReport>('Report', reportSchema);

export default Report;
