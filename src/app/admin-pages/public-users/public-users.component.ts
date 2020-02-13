import { Component, OnInit } from '@angular/core';
import {PublicUserService} from "../services/public-user.service";
import {PaginatedUsers, User} from "../users/users.objects";
import swal from 'sweetalert2';
import {MembersService} from "../services/members.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ViewUserInfoComponent} from "./view-user-info/view-user-info.component";
import {UsersService} from "../services/users.service";
declare var $: any;
@Component({
  selector: 'app-public-users',
  templateUrl: './public-users.component.html',
  styles: ['.zoom { transition: transform .2s;  } .zoom:hover { -ms-transform: scale(1.1); -webkit-transform: scale(1.1); transform: scale(1.1);  }']
})
export class PublicUsersComponent implements OnInit {
     public  loading = false;
     public paginated_users: PaginatedUsers = new PaginatedUsers();
    constructor(public usersService: UsersService, private dialog: MatDialog, private publicUsersService: PublicUserService, public userService: UsersService, public memberService: MembersService, ) { }

  ngOnInit() {
      this.updatePublicUsersComponent();
      this.publicUsersService.PaginatedMoblieUsersEmitter.subscribe(
          data => {this.paginated_users = data; this.loading = false; }
      );
  }
    public updatePublicUsersComponent() {
        this.loading = true;
        this.publicUsersService.getPaginatedMoblieUsers();
    }
    public updateUserDataList(event: any) {
        console.log(event);
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.publicUsersService.getPaginatedUsersAll(this.paginated_users.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }
    // public addUserToMember(user: User) {
    //     user.status = true;
    //     this.memberService.updateMember(user).subscribe(
    //         data => {this.updatePublicUsersComponent();  }
    //     );
    // }

    public viewFullInfo(selected_user: User): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = selected_user;
        const dialogRef = this.dialog.open(ViewUserInfoComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if ( result ) {
                this.loading = true;
                this.userService.updateUser(result).subscribe(
                    data => {
                        this.updatePublicUsersComponent();
                        swal(
                            {
                                title: 'Partner Info Updated!!!',
                                text: 'Partner  Updated Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    erro => {
                        swal({
                            title: 'Whoops! Failed To Update Partner',
                            text: erro.error.message,
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                        console.log(erro);
                        this.loading = false;
                    }
                );
            }
        });
    }
    public removeUser(user: User) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Public User',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.publicUsersService.deleteUser(user).subscribe(
                    data => {
                        this.showNotification(4, 'top', 'right', 'Public User Account Deleted');
                        this.updatePublicUsersComponent();
                        swal(
                            {
                                title: 'Deleted!',
                                text: 'Public User Account Deleted Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    error => {
                        swal({
                            title: 'Whoops! Failed to Delete',
                            text: 'Unable to delete this Public user',
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                    }
                );
            }
        });
    }
    public showNotification(type_id, from, align, message_text) {
        const type = ['', 'info', 'success', 'warning', 'danger'];
        $.notify({
            icon: 'notifications',
            message: message_text,
        }, {
            type: type[type_id],
            timer: 10,
            placement: {
                from: from,
                align: align
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} ' +
            'alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">' +
            '<i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0"' +
            'aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
    }
}
