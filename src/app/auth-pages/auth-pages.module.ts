import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AuthPagesRouting} from './auth-pages-routing';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import {RouterModule} from '@angular/router';
import {
  MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatRippleModule, MatSelectModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {ComponentsModule} from '../components/components.module';
import {NgxLoadingModule} from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthPagesRouting),
    ComponentsModule,
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDialogModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [LoginPageComponent, RegisterPageComponent, ForgotPasswordPageComponent]
})
export class AuthPagesModule { }
