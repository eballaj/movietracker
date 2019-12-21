import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthGuard} from './profile/auth.guard';
import {AdminComponent} from './admin/admin.component';
import {AuthAdminGuard} from './admin/auth-admin.guard';

const routes: Routes = [
  {
    path: 'admin', component : AdminComponent, canActivate: [AuthAdminGuard]
  },
  {
    path: 'login', component : LoginComponent
  },
  {
    path: 'register', component : RegisterComponent
  },
  {
    path: 'profile', component : ProfileComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
