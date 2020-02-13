import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {UsersService} from '../../services/users.service';
import {User} from '../users.objects';

@Component({
  selector: 'app-update-user-dialog',
  templateUrl: './update-user-dialog.component.html',
  styleUrls: ['./update-user-dialog.component.scss']
})
export class UpdateUserDialogComponent implements OnInit {
  public selected_user_data = new User();
  public user_roles_list: User[];
  constructor(public dialogRef: MatDialogRef<UpdateUserDialogComponent>,
              public usersService: UsersService,
              @Inject(MAT_DIALOG_DATA) selected_user_data: User) {
    this.selected_user_data = selected_user_data;
    console.log('Update User:', this.selected_user_data);
  }

  ngOnInit() {
    console.log('Update User:', this.selected_user_data);
    this.user_roles_list = [];
    this.updateUserDialogComponent();
    this.usersService.UserRoleListEmitter.subscribe(
        data => {this.user_roles_list = data; }
    );
  }
  public updateUserDialogComponent() {
    this.usersService.getUserRoleListData();
  }
  public updateAdmin() {
    this.dialogRef.close(this.selected_user_data);
  }
}
