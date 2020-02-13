import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {UsersService} from "../../services/users.service";
import {User} from "../../users/users.objects";

@Component({
  selector: 'app-view-user-info',
  templateUrl: './view-user-info.component.html',
  styles: []
})
export class ViewUserInfoComponent implements OnInit {

    public selected_user_data = new User();
    constructor(public dialogRef: MatDialogRef<ViewUserInfoComponent>,
                public userService: UsersService,
                @Inject(MAT_DIALOG_DATA) selected_user: User) {
        this.selected_user_data = selected_user;
    }

  ngOnInit() {
  }
    public cancel() {
        this.dialogRef.close();
    }
}
