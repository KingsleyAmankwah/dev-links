import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LayoutComponent } from './components/layout/layout.component';

export const authRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: SignInComponent, title: 'Sign In' },
      {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'Sign Up',
      },
    ],
  },
];
