import {EventEmitter, Injectable} from '@angular/core';
import {AuthCallback, LoginUser, RegisterUser} from '../auth-pages/login-page/login-page.objects';
import {Router} from '@angular/router';
import {HttpRequestService} from './http-request.service';
import {Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public UserAuthEmitter = new EventEmitter<AuthCallback>();
  public RegisterEmitter = new EventEmitter<AuthCallback>();

  constructor(private httpService: HttpRequestService, private routeManager: Router) {
  }

  public authenticate(user: LoginUser) {
    const header = new Headers();
    console.log('authenticating', user);
    this.httpService.sendPostRequest('authenticate', user, header).subscribe(
        data => {
          this.processAuthenticate(data, true); console.log(data);
        },
        err => {
          this.processAuthenticate(err, false)
        }
    );
  }

  public registerUser(user: RegisterUser) {
    const header = new Headers();
    console.log('Registering', user);
    this.httpService.sendPostRequest('register', user, header).subscribe(
        data => {
          this.processRegistration(data, true);
          console.log(data);
        },
        err => {
          this.processRegistration(err, false);
          console.log(err);
        }
    );
  }

  private processAuthenticate(response: any, state) {
    if (state) {
      if (response && response.status && response.token) {
        if (response.user && response.user.full_name) {
          this.setFullName(response.token);
        }
        this.setUserToken(response.token);
        const authCallback = new AuthCallback();
        authCallback.isValid = true;
        authCallback.message = 'authenticated';
        authCallback.error = 'Authenticated';
        this.UserAuthEmitter.emit(authCallback);
      } else {
        const authCallback = new AuthCallback();
        authCallback.isValid = false;
        authCallback.message = 'Whoops! Something Went Wrong! try again';
        authCallback.error = 'Unable to Authenticate';
        this.UserAuthEmitter.emit(authCallback);
      }
    } else {
      const authCallback = new AuthCallback();
      authCallback.isValid = false;
      authCallback.message = 'Whoops! Unable to Authenticate';
      authCallback.error = 'Unable to Authenticate';
      this.UserAuthEmitter.emit(authCallback);
    }
  }

  private processRegistration(response: any, state) {
    if (state) {
      if (response && response.user) {
        const registerCallback = new AuthCallback();
        registerCallback.isValid = true;
        registerCallback.message = 'Successfully Registered';
        registerCallback.error = 'Successfully Registered';
        this.RegisterEmitter.emit(registerCallback);
      } else {
        const registerCallback = new AuthCallback();
        registerCallback.isValid = false;
        registerCallback.message = 'Whoops! registration failed';
        registerCallback.error = 'Whoops! registration failed';
        this.RegisterEmitter.emit(registerCallback);
      }
    } else  {
      const registerCallback = new AuthCallback();
      registerCallback.isValid = false;
      registerCallback.message = 'Whoops! registration failed';
      registerCallback.error = 'Whoops! registration failed';
      console.log(response);
      this.RegisterEmitter.emit(registerCallback);
    }
  }
  public  loggedIn(){
      return !!localStorage.getItem('mkc_user_toked');
  }
  public logOut() {
    this.setFullName('');
    this.setUserToken('');
    this.setUserToken('');
    this.routeManager.navigate(['/auth/login'])
  }
  public setUserToken(user_token: string) {
    localStorage.setItem('mkc_user_toked', user_token);
  }
  public getUserToken() {
    return localStorage.getItem('mkc_user_toked')
  }

  public getSelectedTeam() {
      return localStorage.getItem('selected_team_id')
  }
  public setFullName(full_name: string) {
    localStorage.setItem('mkc_user_full_name', full_name);
  }
  public getFullName() {
    return localStorage.getItem('mkc_user_full_name')
  }
}
