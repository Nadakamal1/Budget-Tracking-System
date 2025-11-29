
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import authRoutes from './modules/auth/auth.routes';
import userRoutes from './modules/user/user.routes';
import budgetRoutes from './modules/budget/budget.routes';
import incomeRoutes from './modules/income/income.routes';
import expenseRoutes from './modules/expense/expense.routes';
import goalRoutes from './modules/goal/goal.routes';
import dashboardRoutes from './modules/dashboard/dashboard.routes';
import reportRoutes from './modules/reports/report.routes';

// console.log('authRoutes:', authRoutes);
// console.log('userRoutes:', userRoutes);
// console.log('budgetRoutes:', budgetRoutes);
// console.log('incomeRoutes:', incomeRoutes);
// console.log('expenseRoutes:', expenseRoutes);
// console.log('goalRoutes:', goalRoutes);
// console.log('dashboardRoutes:', dashboardRoutes);
// console.log('reportRoutes:', reportRoutes);


const app: Application = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Base route
app.get('/', (_req: Request, res: Response) => {
  res.send('Budget Tracking API is running!');
});

// Register routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/incomes', incomeRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/goals', goalRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/reports', reportRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err: any, _req: Request, res: Response, _next: any) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Server error', error: err.message });
});

export default app;
