import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthCallback, LoginUser} from './login-page.objects';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public new_login_user = new LoginUser();
  public loading = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.UserAuthEmitter.subscribe(
        data => {this.processAuthCallBack(data)}
    );
  }
  public loginUser() {
    this.loading = true;
    this.authService.authenticate(this.new_login_user);
  }
  private processAuthCallBack(authCall: AuthCallback) {
    if (authCall.isValid) {
      this.router.navigate(['/admin/dashboard']);
    } else {
      this.loading = false;
      this.new_login_user = new LoginUser();
      swal({
        title: authCall.error,
        text: authCall.message,
        buttonsStyling: true,
        confirmButtonClass: 'btn btn-success'
      });
    }
  }

}
