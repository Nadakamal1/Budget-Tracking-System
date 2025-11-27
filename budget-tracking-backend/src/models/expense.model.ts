export interface Expense {
  id: string;
  userId: string;
  amount: number;
  date: string;
  category: string; 
  description?: string;
}
