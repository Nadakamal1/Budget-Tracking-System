import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'register', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'budget', loadChildren: () => import('./budget/budget.module').then(m => m.BudgetModule) },
  { path: 'expenses', loadChildren: () => import('./expenses/expenses.module').then(m => m.ExpensesModule) },
  { path: 'income', loadChildren: () => import('./income/income.module').then(m => m.IncomeModule) },
  { path: 'goals', loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule) },
  { path: 'reports', loadChildren: () => import('./reports/reports.module').then(m => m.ReportsModule) },
  { path: '**', redirectTo: '/dashboard' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
