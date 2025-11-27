import mongoose, { Schema, Document } from 'mongoose';

export type ReportType = 'income-expense' | 'budget-variance' | 'savings-progress';

export interface IReport extends Document {
  userId: string;
  type: ReportType;
  title: string;
  description?: string;
  generatedAt: Date;
  data: any; 
}

const reportSchema = new Schema<IReport>({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  generatedAt: { type: Date, default: Date.now },
  data: { type: Schema.Types.Mixed, required: true },
}, { timestamps: true });

const Report = mongoose.model<IReport>('Report', reportSchema);

export default Report;
