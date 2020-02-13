import {Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {ForgotPasswordPageComponent} from './forgot-password-page/forgot-password-page.component';

export const AuthPagesRouting: Routes = [
  { path: 'login',      component: LoginPageComponent },
  { path: 'register',      component: RegisterPageComponent },
  { path: 'forgot-password',      component: ForgotPasswordPageComponent },
];
