import {Component, OnInit, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {UsersService} from '../services/users.service';
import {PaginatedUsers, User, UserRole} from './users.objects';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewUserDialogComponent} from './new-user-dialog/new-user-dialog.component';
import {UpdateUserDialogComponent} from './update-user-dialog/update-user-dialog.component';
declare var $: any;
import swal from 'sweetalert2';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
    styles:[ '.zoom { transition: transform .2s;  } .zoom:hover { -ms-transform: scale(1.1); -webkit-transform: scale(1.1); transform: scale(1.1);  }']
})
export class UsersComponent implements OnInit {
  public paginated_users: PaginatedUsers = new PaginatedUsers();
  public new_user = new User();
  public selected_user = new User();
  public user_roles_list: UserRole[] = [];
  public modalRef: BsModalRef;
  public loading = false;
  constructor(private usersService: UsersService, private modalService: BsModalService, private dialog: MatDialog) { }

  ngOnInit() {
    this.user_roles_list = [];
    this.updateUsersComponent();

    this.usersService.PaginatedUsersEmitter.subscribe(
        data => {this.paginated_users = data; this.loading = false; }
    );
    this.usersService.UserRoleListEmitter.subscribe(
        data => {this.user_roles_list = data; }
    );
  }
  public updateUsersComponent() {
    this.loading = true;
    this.usersService.getUserRoleListData();
    this.usersService.getPaginatedUsers();
  }
  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
    public updateUserDataList(event: any) {
        console.log(event);
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.usersService.getPaginatedUsersAll(this.paginated_users.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }
  public addNewUser() {
    this.loading = true;
    this.usersService.addNewUser(this.new_user).subscribe(
        data => {this.updateUsersComponent(); },
        erro => {console.log('error', erro)}
    );
  }
  public addNewUserDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = new User();
    const dialogRef = this.dialog.open(NewUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if ( result ) {
          this.loading = true;
          this.usersService.addNewUser(result).subscribe(
              data => {
                  this.updateUsersComponent()
              },
              erro => {
                  swal({
                      title: 'Whoops! Failed To Create Admin',
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
  public updateUserDialog(selected_user: User): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '800px';
    dialogConfig.data = selected_user;
    const dialogRef = this.dialog.open(UpdateUserDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
        if ( result ) {
            this.loading = true;
            this.usersService.updateUser(result).subscribe(
                data => {
                    this.updateUsersComponent()
                },
                erro => {
                    swal({
                        title: 'Whoops! Failed To Update Admin',
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
  public onEditUser(user) {
      this.selected_user = user;
  }
  public updateUser() {
    this.loading = true;
    this.usersService.updateUser(this.selected_user).subscribe(
        data => {this.updateUsersComponent(); },
        erro => {console.log('error', erro)}
    );
  }
  public removeUser(user: User) {
    swal({
          title: 'Are you sure?',
          text: 'Your will not be able to recover this User',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel please!',
        },
    ).then((result) => {
      if (result.value) {
        this.loading = true;
        this.usersService.deleteUser(user).subscribe(
            data => {
              this.showNotification(4, 'top', 'right', 'User Account Deleted');
              this.updateUsersComponent();
              swal(
                  {
                    title: 'Deleted!',
                    text: 'User Account Deleted Successfully.',
                    type: 'success',
                    confirmButtonColor: '#DD6B55'
                  })
            },
            error => {
              swal({
                title: 'Whoops! Failed to Delete',
                text: 'Unable to delete this user',
                animation: true,
                confirmButtonColor: '#DD6B55',
                customClass: 'animated tada'
              });
            }
        );
      }
    });
  }
  public changeStatus(user: User) {
    this.loading = true;
    user.status = !user.status;
    this.usersService.changeUserStatus(user).subscribe(
        data => {this.updateUsersComponent(); console.log(data)},
        error => {this.showSwalMessage('Whoops! Unabale to make change', 'unable to update user status', 1)}
    );
  }

  public showSwalMessage(title, message, type) {
    this.loading = false;
    const alert_type = ['', 'info', 'success', 'warning', 'danger'][type];
    swal({
      title: title,
      text: message,
      // type: {'type': alert_type},
      showCancelButton: false,
      confirmButtonColor: '#DD6B55', confirmButtonText: 'Ok, I Got It',
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
