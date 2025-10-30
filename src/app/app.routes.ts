import { Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),canActivate:[authGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.Login)
  },
  {
    path:'signup',loadComponent: () => import('./auth/signup/signup').then(m => m.Signup)
  },
   {
    path: 'home',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),canActivate:[authGuard]
  },
  
];
