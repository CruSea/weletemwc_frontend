import { Component, OnInit } from '@angular/core';
import {AuthCallback, RegisterUser} from '../login-page/login-page.objects';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {
  public new_register_user = new RegisterUser();
  public loading = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.RegisterEmitter.subscribe(
        data => {this.processAuthCallBack(data)}
    );
  }
  public registerUser() {
    this.loading = true;
    this.authService.registerUser(this.new_register_user);
  }
  private processAuthCallBack(authCall: AuthCallback) {
    console.log(authCall);
    if (authCall.isValid) {
      this.router.navigate(['/auth/login']);
    } else {
      this.loading = false;
      this.new_register_user = new RegisterUser();
      swal({
        title: authCall.error,
        text: authCall.message,
        buttonsStyling: true,
        confirmButtonClass: 'btn btn-success'
      });
    }
  }

}
