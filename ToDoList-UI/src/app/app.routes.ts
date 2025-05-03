import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth';

export const routes: Routes = [{ path: '', redirectTo: 'main', pathMatch: 'full' },
{
  path: 'main',
  canLoad: [AuthGuard], // Replaces canLoad
  loadChildren: () => import('./features/main/main.routes')
    .then(r => r.MAIN_ROUTES)
},
{
  path: 'login',
  loadComponent: () => import('./features/auth/login/login.component')
    .then(c => c.LoginComponent)
},
{
  path: 'register',
  loadComponent: () => import('./features/auth/register/register.component')
    .then(c => c.RegisterComponent)
},
{ path: '**', redirectTo: 'main' }
];
