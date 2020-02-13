import {AfterViewInit, Component, OnInit, Inject, ElementRef, ViewChild} from '@angular/core';
import {MembersService} from '../../services/members.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../services/users.service';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig, MatDialog} from '@angular/material';
import {Children, Member, MemberPreviousChurch, Spouse} from '../members.objects';
import {User} from '../../users/users.objects';
import swal from 'sweetalert2';
import {Countries} from "../countries.objects";
import {NewMemberChildComponent} from "./new-member-child/new-member-child.component";
declare var $: any;
@Component({
  selector: 'app-edit-member-dialog',
  templateUrl: './edit-member-dialog.component.html',
  styles: []
})
export class EditMemberDialogComponent implements OnInit, AfterViewInit {
  public file_upload_event: any;
  public selected_member = new Member();
  public  countries = new Countries();
  isLinear = true;
  public new_member_spouse_info = new Spouse();
  public selected_member_children_info: Children[] = [];
  public new_member_children_info = new Children();
  public selected_member_child = new Children();
  public new_member_previous_church_info = new MemberPreviousChurch();
  public user_roles_list: User[] = [];
  @ViewChild('video')
  public video: ElementRef;
  @ViewChild('canvas')
  public canvas: ElementRef;
    public  image: string;
    public panel1 = true;
    public panel2 = false;
    public panel3 = false;
    public panel4 = false;
    public captures: Array<any>;
    public is_spouse = false;
    public is_children = false;
    public is_church = false;
    public  child_update_state = false;
    public photo_taken = false;
    public show_pic = true;
    public loading = false;

  constructor(private membersService: MembersService,
              private dialog: MatDialog,
              private _formBuilder: FormBuilder,
              private usersService: UsersService,
              public dialogRef: MatDialogRef<EditMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) member_data: Member) {
    this.selected_member = member_data;

      this.loadData();
  }

  public loadData(){
      if (this.selected_member.spouse != null ) {
          this.is_spouse = true;
          this.new_member_spouse_info = this.selected_member.spouse;
      } else{
          this.is_spouse = false;
      }

      if(this.selected_member.children != null && this.selected_member.children.length > 0 ) {
          this.is_children = true;
          this.selected_member_children_info = this.selected_member.children;
      } else{
          this.is_children = false;
      }
      if(this.selected_member.member_previous_church  != null ) {
          this.is_church = true;
          this.new_member_previous_church_info = this.selected_member.member_previous_church;
      } else{
          this.is_church = false;
      }

      this.captures = [];
      if (this.selected_member.spouse == null) {
          this.selected_member.spouse = new Spouse();
      }
      if(this.selected_member.children == null) {
          this.selected_member.children = [];
      }
      if(this.selected_member.member_previous_church == null) {
          this.selected_member.member_previous_church = new MemberPreviousChurch();
      }
  }

  ngOnInit() {
    this.usersService.getUserRoleListData();
    this.usersService.UserRoleListEmitter.subscribe(
        data => {this.user_roles_list = data; }
    );

    this.membersService.selected_member_emitter.subscribe(
        data => {
            console.log("New member data " + data );
            this.loading = false;
            this.selected_member = data;
            this.loadData();
        }, error => {}
    )
  }
    public updateMembersComponent() {
      this.loading = true;
      this.membersService.getSingleMembersData(this.selected_member.id);
        // this.membersService.getMembersData();
    }

    public processUpdateMembers(data){
        this.selected_member_child = data;
    }

    public panel1_status(status: boolean) {
        if (status) {
            this.panel2 = false;
            this.panel3 = false;
            this.panel4 = false;
            this.panel1 = true;
        } else {
            this.panel1 = false;
        }
    }
    public panel2_status(status: boolean) {
        if (status) {
            console.log(status);
            this.panel1 = false;
            this.panel3 = false;
            this.panel4 = false;
            this.panel2 = true;
        } else {
            this.panel2 = false;
        }
    }
    public panel3_status(status: boolean) {
        if (status) {
            console.log(status);
            this.panel1 = false;
            this.panel2 = false;
            this.panel4 = false;
            this.panel3 = true;
        } else {
            this.panel3 = false;
        }
    }
    public panel4_status(status: boolean) {
        if (status) {
            console.log(status);
            this.panel1 = false;
            this.panel2 = false;
            this.panel3 = false;
            this.panel4 = true;
        } else {
            this.panel4 = false;
        }
    }

  public fileUploadEvent(event) {
    this.file_upload_event = event.srcElement.files;
  }

  public  updateMemberInfo(){
      if(! (this.selected_member.living_status == 'ሌላ') ){
          this.selected_member.living_status_other = '';
      }

      if (this.file_upload_event && this.file_upload_event.length > 0) {
          this.selected_member.image_file = this.file_upload_event[0];
          this.selected_member.image_file_name = this.file_upload_event[0].name;
      }

      this.loading = true;
      this.selected_member.photo_url =  this.image;
      this.membersService.updateMember(this.selected_member).subscribe(
          data => {this.updateMembersComponent(); this.loading = false;
              swal(
                  {
                      title: 'Member Data Update!!',
                      text: 'Member  Updated Successfully.',
                      type: 'success',
                      confirmButtonColor: '#DD6B55'
                  })
          },
          erro => {
              swal({
                  title: 'Whoops! Failed To Update Member',
                  text: erro.error.message,
                  animation: true,
                  confirmButtonColor: '#DD6B55',
                  customClass: 'animated tada'
              });
              console.log(erro); this.loading = false; }
      );
  }
  public  updateSpouseInfo() {
      this.loading = true;
      this.selected_member.spouse = this.new_member_spouse_info;
        this.selected_member.spouse.member_id = this.selected_member.id;
        this.membersService.updateSpouseInfo(this.selected_member.spouse).subscribe(
            data => {this.updateMembersComponent(); this.loading = false;
                swal(
                    {
                        title: 'Member Spouse Info has Been Updated!!',
                        text: 'Spouse Info Update Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })
            },
            erro => {
                swal({
                    title: 'Whoops! Failed To Update Member Spouse Info',
                    text: erro.error.message,
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
                console.log(erro); this.loading = false; }
        );
    }
     public edit(selected_child: Children){
           this.child_update_state = true;
         this.selected_member_child = selected_child;
     }
    public  updateChildInfo() {
          this.loading = true;
        this.selected_member_child.member_id = this.selected_member.id;
        console.log(this.new_member_children_info);
        this.membersService.updateChildInfo(this.selected_member_child).subscribe(
            data => {this.updateMembersComponent(); this.loading = false;
                swal(
                    {
                        title: 'Member Child Info Updated!!',
                        text: 'Child Info Updated Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })
            },
            erro => {
                swal({
                    title: 'Whoops! Failed To Update Member Child Info',
                    text: erro.error.message,
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
                console.log(erro); this.loading = false; }
        );
    }
    public  updatePreviousChurchInfo() {

        if (this.file_upload_event && this.file_upload_event.length > 0) {
            this.new_member_previous_church_info.image_file = this.file_upload_event[0];
            this.new_member_previous_church_info.image_file_name = this.file_upload_event[0].name;
        }
         this.loading = true;

         this.new_member_previous_church_info.member_id = this.selected_member.id;
        // this.selected_member.member_previous_church.member_id = this.selected_member.id;
        this.membersService.updatePreviousChurchInfo(this.new_member_previous_church_info).subscribe(
            data => {this.updateMembersComponent(); this.loading = false;
                swal(
                    {
                        title: 'Member Previous Church  Info updated!!',
                        text: 'Church Info Updated Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })
            },
            erro => {
                swal({
                    title: 'Whoops! Failed To Update Member Church Info',
                    text: erro.error.message,
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
                console.log(erro); this.loading = false; }
        );
    }
    public  addSpouseInfo() {
         this.loading = true;
        this.new_member_spouse_info.member_id = this.selected_member.id;
        console.log(this.new_member_spouse_info);
        this.membersService.addNewSpouseInfo(this.new_member_spouse_info).subscribe(
            data => {this.updateMembersComponent(); this.loading = false;
                swal(
                    {
                        title: 'Member Spouse Info has Been Added!!',
                        text: 'Spouse Info Added Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })
            },
            erro => {
                swal({
                    title: 'Whoops! Failed To Update Member Spouse Info',
                    text: erro.error.message,
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
                console.log(erro); this.loading = false; }
        );
    }
    public  addChildInfo() {
          this.loading = true;
        this.new_member_children_info.member_id = this.selected_member.id;
        // this.dialogRef.close(this.new_member_child_info);
        this.membersService.addNewChildInfo(this.new_member_children_info).subscribe(
            data => {this.updateMembersComponent(); this.loading = false;
                swal(
                    {
                        title: 'Member Child Info Added!!',
                        text: 'Child Info Added Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })
            },
            erro => {
                swal({
                    title: 'Whoops! Failed To Update Member Child Info',
                    text: erro.error.message,
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
                console.log(erro); this.loading = false; }
        );
    }
    public removeChild(child: Children) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Child',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.membersService.deleteChild(child).subscribe(
                    data => {
                        this.showNotification(4, 'top', 'right', 'Child  Deleted');
                        this.updateMembersComponent(); this.loading = false;
                        this.selected_member_children_info.splice(this.selected_member_children_info.indexOf(child), 1);
                        swal(
                            {
                                title: 'Deleted!',
                                text: 'Child  Deleted Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    error => {
                        swal({
                            title: 'Whoops! Failed to Delete',
                            text: 'Unable to delete this Child',
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
    public  addPreviousChurchInfo() {

        if (this.file_upload_event.length > 0) {
            this.new_member_previous_church_info.image_file = this.file_upload_event[0];
            this.new_member_previous_church_info.image_file_name = this.file_upload_event[0].name;

            this.new_member_previous_church_info.member_id = this.selected_member.id;
            this.membersService.addPreviousChurchInfo(this.new_member_previous_church_info).subscribe(
                data => {
                    this.updateMembersComponent(); console.log(data);
                    swal(
                        {
                            title: 'Member Previous Church  Info Added!!',
                            text: 'Church Info Added Successfully.',
                            type: 'success',
                            confirmButtonColor: '#DD6B55'
                        })
                },
                erro => {
                    swal({
                        title: 'Whoops! Failed To Update Member Church Info',
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
    }
  public ngAfterViewInit() {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        // this.video.nativeElement.src = window.URL.createObjectURL(stream);
        // this.video.nativeElement.play();
          this.video.nativeElement.srcObject = stream;
          this.video.nativeElement.play();
      });
    }
  }
  public capture() {
      const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 180, 140);
      this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
      this.image = this.canvas.nativeElement.toDataURL('image/png');
      this.photo_taken = true;

  }
  public hasSpouse() {
      if (this.selected_member.spouse != null) {
          if (this.selected_member.spouse.full_name !== '' && this.selected_member.phone_cell){
              this.new_member_spouse_info = this.selected_member.spouse;
              return true;
          }
      }
      this.new_member_spouse_info = new Spouse();
      return false;

  }
    public cancel() {
        this.dialogRef.close();
    }



    public addNewChild(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new Children();
        const dialogRef = this.dialog.open(NewMemberChildComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                result.member_id = this.selected_member.id;
                this.membersService.addNewChildInfo(result).subscribe(
                    data => {this.updateMembersComponent();
                    this.loading = false;
                        swal(
                            {
                                title: 'Added!',
                                text: 'Child Added Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    erro => {
                        swal({
                            title: 'Whoops! Unable to Add Child',
                            text: erro.error.message,
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                        this.loading = false; }
                );
            }
        });
    }


}
