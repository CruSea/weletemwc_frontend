import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MembersService} from '../../services/members.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Member, Children, MemberPreviousChurch} from '../members.objects';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {User} from '../../users/users.objects';
import {UsersService} from '../../services/users.service';
import {Spouse} from "../spouse-info.objects";
import swal from 'sweetalert2';
import {Countries} from "../countries.objects";
import {WebcamImage, WebcamInitError, WebcamUtil} from "ngx-webcam";
import {Observable, Subject} from "rxjs/Rx";
@Component({
  selector: 'app-new-member-dialog',
  templateUrl: './new-member-dialog.component.html',
  styleUrls: ['./new-member-dialog.component.scss']
})
export class NewMemberDialogComponent implements OnInit, AfterViewInit {
  public file_upload_event: any;
  public new_member = new Member();
  public  countries = new Countries();
  public new_member_spouse_info = new Spouse();
  public new_member_child_info = new Children();
  public new_member_previous_church_info = new MemberPreviousChurch();
  public user_roles_list: User[] = [];
  @ViewChild('video')
  public video: ElementRef;
  @ViewChild('canvas')
  public canvas: ElementRef;
  public  image: string;
  public captures: Array<any>;
  public panel1 = true;
  public panel2 = false;
  public panel3 = false;
  public panel4 = false;
  public loading = false;
  public photo_taken = false;



  //wecam
    public showWebcam = true;
    public multipleWebcamsAvailable = false;
    public videoOptions: MediaTrackConstraints = {
        // width: {ideal: 1024},
        // height: {ideal: 576}
    };
    public errors: WebcamInitError[] = [];
    // latest snapshot
    public webcamImage: WebcamImage = null;
    // webcam snapshot trigger
    private trigger: Subject<void> = new Subject<void>();
    // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  constructor(private membersService: MembersService,
              private _formBuilder: FormBuilder,
              private usersService: UsersService,
              public dialogRef: MatDialogRef<NewMemberDialogComponent>,
              @Inject(MAT_DIALOG_DATA) new_member_data: Member) {
    this.captures = [];
  }

  ngOnInit() {
      console.log(this.countries);
    this.usersService.getUserRoleListData();
    this.usersService.UserRoleListEmitter.subscribe(
        data => {this.user_roles_list = data; }
    );

    WebcamUtil.getAvailableVideoInputs()
          .then((mediaDevices: MediaDeviceInfo[]) => {
              this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
          });
  }
    public updateMembersComponent() {
        this.membersService.getMembersData();
    }
  public fileUploadEvent(event) {
    this.file_upload_event = event.srcElement.files;
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

  public  addNewMember() {
      if(! (this.new_member.living_status == 'ሌላ') ){
          this.new_member.living_status_other = '';
      }
      console.log(this.new_member);

      if (this.file_upload_event && this.file_upload_event.length > 0) {
          this.new_member.image_file = this.file_upload_event[0];
          this.new_member.image_file_name = this.file_upload_event[0].name;
          this.loading = true;
          this.membersService.addNewMember(this.new_member).subscribe(
              data => {
                  this.updateMembersComponent();
                  console.log(data);
                  this.loading = false;
                  this.setMemberData(data);
                  swal(
                      {
                          title: 'Member Added To Members List!',
                          text: 'Member  Added Successfully.',
                          type: 'success',
                          confirmButtonColor: '#DD6B55'
                      })
              },
              error => {
                  swal({
                      title: 'Whoops! Failed To Create Member',
                      text: error.error.email,
                      animation: true,
                      confirmButtonColor: '#DD6B55',
                      customClass: 'animated tada'
                  });
                  // console.log(error);
                  this.loading = false;
              }
          );
      } else {
          this.loading = true;
          this.new_member.image_file = null;
          this.new_member.photo_url = this.image;
          console.log(this.new_member.photo_url);
          this.membersService.addNewMember2(this.new_member).subscribe(
              data => {
                  this.updateMembersComponent();
                  console.log(data);
                  this.loading = false;
                  this.setMemberData(data);
                  swal(
                      {
                          title: 'Member Added To Members List!',
                          text: 'Member  Added Successfully.',
                          type: 'success',
                          confirmButtonColor: '#DD6B55'
                      })
              },
              error => {
                  swal({
                      title: 'Whoops! Failed To Create Member',
                      text: error.error.error.email,
                      animation: true,
                      confirmButtonColor: '#DD6B55',
                      customClass: 'animated tada'
                  });
                  console.log(error.error.error.email);
                  this.loading = false;
              }
          );
      }

  }

    public setMemberData(response: any) {
      if ( response.result && response.result.id) {
          localStorage.setItem('pjh_Member_id', JSON.stringify(response.result.id));
      }
    }
    public  addSpouseInfo() {
      this.loading = true;
      const member_id = JSON.parse(localStorage.getItem('pjh_Member_id'));
        this.new_member_spouse_info.member_id = member_id;
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
  public ngAfterViewInit() {
      // const binaryData = [];

    if( navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play();
      });
    }
  }

    public  addChildInfo() {
      this.loading = true;
        const member_id = JSON.parse(localStorage.getItem('pjh_Member_id'));
        this.new_member_child_info.member_id = member_id;
        this.membersService.addNewChildInfo(this.new_member_child_info).subscribe(
            data => {this.updateMembersComponent(); this.loading = false; this.new_member_child_info = new Children();
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
    public  addPreviousChurchInfo() {
        if (this.file_upload_event.length > 0) {
            this.new_member_previous_church_info.image_file = this.file_upload_event[0];
            this.new_member_previous_church_info.image_file_name = this.file_upload_event[0].name;

            const member_id = JSON.parse(localStorage.getItem('pjh_Member_id'));
            this.new_member_previous_church_info.member_id = member_id;
            // this.dialogRef.close(this.new_member_child_info);
            this.membersService.addPreviousChurchInfo(this.new_member_previous_church_info).subscribe(
                data => {
                    this.updateMembersComponent(); console.log(data); this.loading = false;
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
    public editDone(){
      localStorage.removeItem('pjh_Member_id');
    }
    public capture() {
        const context = this.canvas.nativeElement.getContext('2d').drawImage(this.video.nativeElement, 0, 0, 180, 140);
        this.captures.push(this.canvas.nativeElement.toDataURL('image/png'));
        this.image = this.canvas.nativeElement.toDataURL('image/png');
        this.photo_taken = true;
        console.log(this.image);
    }
    public cancel() {
        this.dialogRef.close();
    }

    /**
     * Webcam codes
     *
     */
    public triggerSnapshot(): void {
        this.trigger.next();
    }

    public toggleWebcam(): void {
        this.showWebcam = !this.showWebcam;
    }

    public handleInitError(error: WebcamInitError): void {
        this.errors.push(error);
    }

    public handleImage(webcamImage: WebcamImage): void {
        console.info('received webcam image', webcamImage);
        this.webcamImage = webcamImage;
    }


    public get triggerObservable(): Observable<void> {
        return this.trigger.asObservable();
    }


}
