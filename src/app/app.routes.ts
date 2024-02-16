import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth-routing.module').then((m) => m.authRoutes),
  },

  {
    path: 'link',
    loadChildren: () =>
      import('./link/link-routing.module').then((m) => m.linkRoutes),
    canActivate: [authGuard],
  },

  {
    path: '**',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
