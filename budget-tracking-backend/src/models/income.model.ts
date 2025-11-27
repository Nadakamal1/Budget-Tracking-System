export interface Income {
  id: string;
  userId: string;
  amount: number;
  date: string;
  source?: string;
  description?: string;
}
