import { Routes } from '@angular/router';

import { NotFoundComponent } from './404/not-found.component';
import { Login2Component } from './login2/login2.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '404',
        component: NotFoundComponent
      },
      {
        path: 'login2',
        component: Login2Component
      },
    ]
  }
];
