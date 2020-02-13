import {Component, EventEmitter, OnInit} from '@angular/core';
import swal from 'sweetalert2';
import {PaginatedTeamMembers, Team, TeamMember} from "../../team.objects";
import {HttpRequestService} from "../../../../services/http-request.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {TeamService} from "../../../services/team-service";
import {NewTeamLeadersComponent} from "../new-team-leaders/new-team-leaders.component";
import {EditTeamLeadersComponent} from "../edit-team-leaders/edit-team-leaders.component";
import {Member} from "../../../members/members.objects";
declare var $: any;

@Component({
  selector: 'app-team-leaders',
  templateUrl: './team-leaders.component.html',
  styleUrls: ['./team-leaders.component.scss']
})
export class TeamLeadersComponent implements OnInit {

    public paginated_team_leaders  = new PaginatedTeamMembers();
    public selected_team = new Team();
    public all_team_leaders: TeamMember[] = [];
    public searchText: string;
    public loading = false;
    public selected_member = new TeamMember();

    constructor(private  httpService: HttpRequestService, private dialog: MatDialog, public teamService: TeamService)
    {
    }

    ngOnInit() {
        try {
            this.selected_team.id = parseInt(localStorage.getItem('selected_team_id'), 10);
        } catch(err){}

        this.loading = true;
        this.updateTeamLeadersComponent();
        this.teamService.PaginatedTeamLeadersData.subscribe(
            data => {this.paginated_team_leaders = data; this.loading = false;  }
        );
    }

    public updateTeamLeadersComponent() {
        this.teamService.getPaginatedTeamLeadersData();
    }

    public updateTeamMemberDataList(event: any) {
        console.log(event);
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.teamService.getPaginatedTeamMemberAll(this.paginated_team_leaders.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public searchMember(searchText: string){
        this.teamService.getPaginatedSearchTeamMembers(searchText);
    }


    // public ImportMembers(){
    //    this.memberService.importMember();
    // }
    public addMemberToTeam(member: Member) {
        member.status = true;
        this.teamService.addNewTeamMember(member).subscribe(
            data => {this.updateTeamLeadersComponent();

                swal(
                    {
                        title: 'Member Added To Team!',
                        text: 'Member  Added Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })}, error => {
                swal({
                    title: 'Whoops! Failed to Add',
                    text: 'Unable to Add this Member',
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
            }
        );
    }

    public makeNotLeader(member: TeamMember) {
        member.status = true;
        member.is_leader = false;
        member.is_main_leader = false;

        this.teamService.updateTeamLeader(member);
        this.teamService.teamLeadersEvent.subscribe(
            data =>{
                this.updateTeamLeadersComponent()
        });

     /*   this.teamService.updateTeamMember(member).subscribe(
            data => {this.updateTeamLeadersComponent();  }
        );*/
    }

    public makeNotMainLeader(member: TeamMember) {
        member.status = true;
        member.is_leader = true;
        member.is_main_leader = false;
        this.teamService.teamLeadersEvent.subscribe(
            data =>{
                this.updateTeamLeadersComponent()
            });
        /*
        this.teamService.updateTeamMember(member).subscribe(
            data => {this.updateTeamLeadersComponent();  }
        );*/
    }

    public makeMainLeader(member: TeamMember) {
        member.status = true;
        member.is_leader = true;
        member.is_main_leader = true;
        this.teamService.updateTeamLeader(member);
        this.teamService.teamLeadersEvent.subscribe(
            data =>{
                this.updateTeamLeadersComponent()
            });

     /*   this.teamService.updateTeamMember(member).subscribe(
            data => {this.updateTeamLeadersComponent();  }
        );*/
    }

    public addNewMemberDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1400px';
        dialogConfig.data = new TeamMember();
        const dialogRef = this.dialog.open(NewTeamLeadersComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
            }
        });
    }

    public updateMemberDialog(selected_member: TeamMember): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1600px';
        dialogConfig.data = selected_member;
        const dialogRef = this.dialog.open(EditTeamLeadersComponent, dialogConfig);

    }

    public removeLeader(member: TeamMember) {
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
                this.teamService.deleteTeamLeader(member).subscribe(
                    data => {
                        this.showNotification(4, 'top', 'right', 'Member  Deleted');
                        this.updateTeamLeadersComponent();
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
                            text: 'Unable to delete this team member',
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
