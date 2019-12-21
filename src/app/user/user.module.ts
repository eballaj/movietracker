import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from '../shared/services/auth.service';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../material/material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../shared/ui/spinner/spinner.component';
import { AdminComponent } from './admin/admin.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, SpinnerComponent, AdminComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AuthService],
  exports: [
    SpinnerComponent
  ]
})
export class UserModule { }
