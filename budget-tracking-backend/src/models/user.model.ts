export interface User {
  id: string;
  email: string;
  passwordHash?: string;
  displayName?: string;
  currency?: string;  
}