import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NotFoundComponent } from './404/not-found.component';
import { Login2Component } from './login2/login2.component';

import { AuthenticationRoutes } from './authentication.routing';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(AuthenticationRoutes), NgbModule],
  declarations: [NotFoundComponent, Login2Component]
})
export class AuthenticationModule {}
