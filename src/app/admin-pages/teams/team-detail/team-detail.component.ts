import { Component, OnInit } from '@angular/core';
import {PaginatedTeamMembers, Team, TeamMember} from "../team.objects";
import {HttpRequestService} from "../../../services/http-request.service";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {TeamService} from "../../services/team-service";
import swal from 'sweetalert2';
import {EditTeamMemberComponent} from "./edit-team-member/edit-team-member.component";
import {NewTeamMembersComponent} from "./new-team-members/new-team-members.component";
import {NewTeamLeadersComponent} from "./new-team-leaders/new-team-leaders.component";
import {Member} from "../../members/members.objects";
import {DashboardService} from "../../services/dashboard.service";
import { TeamDashboard} from "../../dashboard/dashboard.objects";
import {TeamLeadersComponent} from "./team-leaders/team-leaders.component";
declare var $: any;

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
    public paginated_team_members = new PaginatedTeamMembers();
    public selected_team = new Team();
    public all_team_leaders: TeamMember[] = [];
    public searchText: string;
    public loading = false;
    public file_upload_event: any;
    public selected_member = new TeamMember();
    public dashboard_data = new TeamDashboard();

    constructor(private httpService: HttpRequestService, private dialog: MatDialog, public teamService: TeamService,
                public dashboardService: DashboardService)
    {
    }

    ngOnInit() {
        try {
            this.selected_team.id = parseInt(localStorage.getItem('selected_team_id'), 10);

        } catch(err){}

        this.loading = true;
        this.updateTeamMembersComponent();
        this.teamService.PaginatedTeamMembersData.subscribe(
            data => {this.paginated_team_members = data; this.loading = false;  }
        );

        this.teamService.PaginatedTeamLeadersData.subscribe(
            data => {this.all_team_leaders = data; this.loading = false;  }
        );
        this.dashboardService.TeamDashboardDataEmitter.subscribe(
            data => {this.dashboard_data = data;  }
        );

        this.teamService.teamLeadersEvent.subscribe(
            data => {if(data){
                this.updateTeamMembersComponent();
            }  }
        );

    }

    public updateTeamMembersComponent() {
        this.teamService.getPaginatedTeamMembersData();
        this.dashboardService.getTeamDashboardData();
    }

    public updateTeamLeadersComponent() {
        this.teamService.getPaginatedTeamLeadersData();
        this.dashboardService.getTeamDashboardData();
    }

    public updateTeamMemberDataList(event: any) {
        console.log(event);
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.teamService.getPaginatedTeamMemberAll(this.paginated_team_members.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public searchMember(searchText: string){
        this.teamService.getPaginatedSearchTeamMembers(searchText);
    }

    public getTeamLeaders() {
        this.loading = true;
        this.teamService.getPaginatedTeamLeadersData();
    }

    // public ImportMembers(){
    //    this.memberService.importMember();
    // }
    public addMemberToTeam(member: Member) {
        member.status = true;
        this.teamService.addNewTeamMember(member).subscribe(
            data => {this.updateTeamMembersComponent();

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

    public makeLeader(member: TeamMember) {
        member.is_leader = true;
        member.is_main_leader = false;
        member.status = true;
        this.teamService.updateTeamMember(member).subscribe(
            data => {this.updateTeamLeadersComponent();  }
        );
    }

    public makeMainLeader(member: TeamMember) {
        member.is_leader = true;
        member.is_main_leader = true;
        member.status = true;
        this.teamService.updateTeamMember(member).subscribe(
            data => {this.updateTeamLeadersComponent();  }
        );
    }


    public addNewTeamMember(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '900px';
        dialogConfig.data = new TeamMember();
        const dialogRef = this.dialog.open(NewTeamMembersComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.updateTeamMembersComponent();
            }
        });
    }

    public updateMemberDialog(selected_member: TeamMember): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1600px';
        dialogConfig.data = selected_member;
        const dialogRef = this.dialog.open(EditTeamMemberComponent, dialogConfig);

    }

    public removeMember(member: TeamMember) {
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
                this.teamService.deleteTeamMember(member).subscribe(
                    data => {
                        this.showNotification(4, 'top', 'right', 'Member  Deleted');
                        this.updateTeamMembersComponent();
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
