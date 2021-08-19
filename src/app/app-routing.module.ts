import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { BlankComponent } from './blank/blank.component';
import { LoginComponent } from './login/login.component';
import { FirsttimechangepasswordComponent } from './firsttimechangepassword/firsttimechangepassword.component';

export const Approutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login | PetroTrade',
      urls: [{ title: 'Login', url: '/login' }, { title: 'Login' }]
    }
  },{
    path: 'firsttimechangepassword',
    component: FirsttimechangepasswordComponent,
    data: {
      title: 'Login | PetroTrade',
      urls: [{ title: 'Login', url: '/firsttimechangepassword' }, { title: 'firsttimechangepassword' }]
    }
  },
  {
    path:'',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/layout/stock', pathMatch: 'full' },
      { path: 'layout', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule) },
    ]
  },
  {
    path: '',
    component: BlankComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/authentication/404'
  }
];
