import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {User} from '../users.objects';
import {UsersService} from '../../services/users.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss']
})
export class NewUserDialogComponent implements OnInit {
  public new_user = new User();
  public user_roles_list: User[];
  constructor(public dialogRef: MatDialogRef<NewUserDialogComponent>,
              public usersService: UsersService,
              @Inject(MAT_DIALOG_DATA) new_user_data: User) { }

  ngOnInit() {
    this.user_roles_list = [];
    this.updateNewUserDialogComponent();
    this.usersService.UserRoleListEmitter.subscribe(
        data => {this.user_roles_list = data; }
    );
  }
  public updateNewUserDialogComponent() {
    this.usersService.getUserRoleListData();
  }
  public addNewAdmin() {
    this.dialogRef.close(this.new_user);
  }

}
