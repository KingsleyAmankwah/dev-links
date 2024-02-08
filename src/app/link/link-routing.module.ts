import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { ListComponent } from './pages/list/list.component';
import { PreviewComponent } from './pages/preview/preview.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EmptyLayoutComponent } from './components/empty-layout/empty-layout.component';

export const linkRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },

      {
        path: 'list',
        component: ListComponent,
      },

      {
        path: 'profile',
        component: ProfileComponent,
      },
    ],
  },

  {
    path: 'preview',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        component: PreviewComponent,
      },
    ],
  },
];
