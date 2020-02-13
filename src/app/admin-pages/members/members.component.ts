import { Component, OnInit } from '@angular/core';
import {Children, Member, MemberPreviousChurch, PaginatedMembers} from './members.objects';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {NewMemberDialogComponent} from './new-member-dialog/new-member-dialog.component';
import {MembersService} from '../services/members.service';
import swal from 'sweetalert2';
import {EditMemberDialogComponent} from './edit-member/edit-member-dialog.component';
import {PublicUserService} from '../services/public-user.service';
import {Spouse} from './spouse-info.objects';
import {ViewMemberInfoComponent} from './view-member-info/view-member-info.component';
import {DashboardService} from '../services/dashboard.service';
import {MemberDashboard} from '../dashboard/dashboard.objects';
import {HttpRequestService} from "../../services/http-request.service";
declare var $: any;
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
  styles:[ '.zoom { transition: transform .2s;  } .zoom:hover { -ms-transform: scale(1.1); -webkit-transform: scale(1.1); transform: scale(1.1);  }']
})
export class MembersComponent implements OnInit {
  public paginated_public_users = new PaginatedMembers();
  public searchText: string;
  public searchTextType: string;
  public searchType: string;
  public loading = false;
  public file_upload_event: any;
  public selected_member = new Member();
  public selected_member_spouse = new Spouse();
  public selected_member_previous_church = new MemberPreviousChurch();
  public new_spouse = new Spouse();
  public dashboard_member_data = new MemberDashboard();
  public paginated_member_data = new PaginatedMembers();
  public filter_activate = true;
  public export_url = '';
  public pdf_url = '';
  constructor(private  httpService: HttpRequestService, private dialog: MatDialog, public memberService: MembersService, public mobileUserService: PublicUserService, public dashboardService: DashboardService) {
      this.export_url = this.httpService.admin_url + 'export';
      this.pdf_url = this.httpService.admin_url + 'pdf';
  }

  ngOnInit() {
      this.loading = true;
    this.updateMembersComponent();
    this.memberService.PaginatedMembersEmitter.subscribe(
        data => {this.paginated_member_data = data; this.loading = false;  }
    );
    this.dashboardService.MemberDashboardDataEmitter.subscribe(
        data => {this.dashboard_member_data = data; console.log(data); }
    );
      // this.mobileUserService.PaginatedMoblieUsersEmitter.subscribe(
      //     data => {this.dashboard_member_data = data; }
      // );
  }

  public updateMembersComponent() {
      this.dashboardService.getMemberDashboardData();
      if (this.filter_activate) {
          this.memberService.getMembersData();
      } else  {
          this.memberService.getMembershipRequests();
      }
    this.memberService.getPaginatedMembers(this.paginated_member_data);

  }
    public updateMemberDataList(event: any) {
        console.log(event);
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.memberService.getPaginatedMemberAll(this.paginated_member_data.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }
    public searchMember(searchText: string){
          this.memberService.getPaginatedSearchMembers(searchText);
    }

    public searchMemberDetail(searchText: string, searchType: string){
        this.memberService.getPaginatedSearchMembersDetail(searchText, searchType);
    }
    public getMembers() {
        this.loading = true;
        this.filter_activate = true;
        this.memberService.getMembersData();
    }
    public getMembershipRequests() {
        this.loading = true;
        this.filter_activate = false;
        this.memberService.getMembershipRequests();
    }
    public ExportMembers(){
        window.open(this.export_url, '_blank');
    }
    public DownloadPdfMembers(){
        window.open(this.pdf_url, '_blank');
    }
    public fileUploadEvent(event) {
        this.file_upload_event = event.srcElement.files;
        console.log(event);
    }
    // public ImportMembers(){
    //    this.memberService.importMember();
    // }
    public addUserToMember(member: Member) {
        member.status = true;
    this.memberService.updateMember(member).subscribe(
        data => {this.updateMembersComponent();

            swal(
                {
                    title: 'Member Added To Partnership List!',
                    text: 'Partner  Added Successfully.',
                    type: 'success',
                    confirmButtonColor: '#DD6B55'
                })}, error => {
            swal({
                title: 'Whoops! Failed to Add',
                text: 'Unable to Add this Partner',
                animation: true,
                confirmButtonColor: '#DD6B55',
                customClass: 'animated tada'
            });
        }
    );
    }
    public makePartner(member: Member) {
        member.status = false;
        this.memberService.updateMember(member).subscribe(
            data => {this.updateMembersComponent();  }
        );
    }
  public addNewMemberDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1400px';
    dialogConfig.data = new Member();
    const dialogRef = this.dialog.open(NewMemberDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.loading = true;
      }
    });
  }
  public updateMemberDialog(selected_member: Member): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1600px';
    dialogConfig.data = selected_member;
    const dialogRef = this.dialog.open(EditMemberDialogComponent, dialogConfig);

  }
    public viewMemberInfo(selected_member: Member): void {
      console.log('from function', selected_member);
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1600px';
        dialogConfig.data = selected_member;
        const dialogRef = this.dialog.open(ViewMemberInfoComponent, dialogConfig);

    }

  public removeMember(member: Member) {
    swal({
          title: 'Are you sure?',
          text: 'Your will not be able to recover this member',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel please!',
        },
    ).then((result) => {
      if (result.value) {
        this.loading = true;
        this.memberService.deleteMember(member).subscribe(
            data => {
              this.showNotification(4, 'top', 'right', 'Member  Deleted');
              this.updateMembersComponent();
              swal(
                  {
                    title: 'Deleted!',
                    text: 'Member  Deleted Successfully.',
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
