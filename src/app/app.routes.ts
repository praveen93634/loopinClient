import { Routes } from '@angular/router';
import { authGuard } from './auth/guard/auth-guard';
import { Mainlayout } from './layout/mainlayout/mainlayout';
import { Auth } from '@angular/fire/auth';
import { Authlayout } from './layout/authlayout/authlayout';

export const routes: Routes = [
  {
    path: '',
    component: Mainlayout,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard]
      },
      {
        path: 'home',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard), canActivate: [authGuard]
      },
      {
        path: 'connections', loadComponent: () => import('./connections/connections').then(m => m.Connections), canActivate: [authGuard]
      },
      {
        path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile), canActivate: [authGuard]
      },{
        path: 'requests', loadComponent: () => import('./requests/requests').then(m => m.Requests), canActivate: [authGuard]
      },
      {
        path:'chat',loadComponent:()=>import('./componants/chat-window/chat-window').then(x=>x.ChatWindow)
      }
    ]
  },
  {
    path: '',
    component: Authlayout,
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login/login').then(m => m.Login)
      },
      {
        path: 'signup', loadComponent: () => import('./auth/signup/signup').then(m => m.Signup)
      },
    ]
  }
];
