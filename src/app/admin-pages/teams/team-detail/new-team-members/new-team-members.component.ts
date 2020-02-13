import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {PaginatedTeamMembers, Team, TeamCategory, TeamMember} from "../../team.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeamService} from "../../../services/team-service";
import {MembersService} from "../../../services/members.service";
import {Member, PaginatedMembers} from "../../../members/members.objects";
declare var $: any;

@Component({
  selector: 'app-new-team-members',
  templateUrl: './new-team-members.component.html',
  styleUrls: ['./new-team-members.component.scss']
})
export class NewTeamMembersComponent implements OnInit {

    public all_members = new PaginatedMembers();
    public loading = false;
    public selected_team_member = new TeamMember();
    public new_changes = false;

    constructor(public dialogRef: MatDialogRef <NewTeamMembersComponent>,
                @Inject(LOCALE_ID) private locale: string,
                @Inject(MAT_DIALOG_DATA) new_team: Team,
                private teamService: TeamService, private memberService: MembersService) {
    }
    ngOnInit() {
        this.memberService.PaginatedMembersEmitter.subscribe(
            data => {
                this.all_members = data;
            }, error => {

            }
        );

        this.getMembers();
    }

    public getMembers(){
        this.memberService.getAllMembersNotInTeam();
    }

    public updateMemberDataList(event: any) {
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.teamService.getPaginatedTeamMemberAll(this.all_members.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }

    public addTeamMember() {

    }

    public addMemberToTeam(member: Member) {
        member.status = true;
        this.loading = true;
        this.teamService.addNewTeamMember(member).subscribe(
            data => {this.getMembers();

                this.showNotification(2, 'top', 'right', "Team member Added!");
                this.new_changes = true;
                this.loading = false;
            }, error => {
                this.loading = false;
                this.showNotification(3, 'top', 'right', "Error in adding team member!");
            }
        );
    }

    public searchMember(searchText: string){
        this.memberService.getPaginatedSearchMembersNotInTeam(searchText);
    }

    public cancel() {
        this.dialogRef.close(this.new_changes);
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
