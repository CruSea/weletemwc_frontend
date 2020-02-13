import {Component, OnInit, TemplateRef} from '@angular/core';
import {PaginatedTeams, Team, TeamMember} from "./team.objects";
import {BsModalRef, BsModalService} from "ngx-bootstrap";
import {TeamService} from "../services/team-service";
import {MatDialog, MatDialogConfig, MatTableDataSource} from "@angular/material";
import {NewTeamComponent} from "./new-team/new-team.component";
import {EditTeamComponent} from "./edit-team/edit-team.component";
import {Router} from "@angular/router";
import {TeamCategoriesComponent} from "./team-categories/team-categories.component";
import swal from 'sweetalert2';
declare var $: any;



@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

    public paginated_teams_data = new PaginatedTeams();
    public selected_team = new Team();
    public modalRef: BsModalRef;
    public loading = false;
    public root_url = '';

    displayedColumns: string[] = ['full_name', 'phone_cell'];

    constructor(private teamService: TeamService, private modalService: BsModalService,
               private dialog: MatDialog, private router: Router) { }

    ngOnInit() {
        // this.loading = true;
        this.root_url = this.teamService.getRootUrl();
        this.updateTeamsComponent();
        this.teamService.PaginatedTeamData.subscribe(
            data => {this.paginated_teams_data = data; this.loading = false; console.log(data);}
        );
    }

    public updateTeamsComponent() {
        this.teamService.getPaginatedTeamsData();
    }

    public openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    public openTeamCategories(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }


    // public getImageFullUrl(image_url: string) {
    //   return this.playlistService.getRootUrl() + image_url;
    // }


    public addNewTeam(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new Team();
        const dialogRef = this.dialog.open(NewTeamComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamService.addNewTeam(result).subscribe(
                    data => {this.updateTeamsComponent();
                        swal(
                            {
                                title: 'Added!',
                                text: 'Team Added Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    erro => {
                        swal({
                            title: 'Whoops! Unable to Add team',
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

    // public onEditPlaylist(playlist) {
    //   this.selected_playlist = playlist;
    // }
    public editTeam(team): void {
        this.selected_team = team;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = this.selected_team;
        const dialogRef = this.dialog.open(EditTeamComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamService.updateTeam(result).subscribe(
                    data => {this.updateTeamsComponent(); console.log(data);
                        swal(
                            {
                                title: 'Updated!',
                                text: 'Team Updated Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })},
                    erro => {
                        swal({
                            title: 'Whoops! Unable to edit',
                            text: erro.error.message,
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                        this.loading = false;
                    }
                );
            }
        });
    }
    public removeTeam(team: Team) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this team',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.teamService.deleteTeam(team).subscribe(
                    data => {
                        this.showNotification(4, 'top', 'right', 'Team  Deleted');
                        this.updateTeamsComponent();
                        swal(
                            {
                                title: 'Deleted!',
                                text: 'Team Deleted Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    error => {
                        swal({
                            title: 'Whoops! Failed to Delete',
                            text: 'Unable to delete this Team',
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

    public openTeamDetail(team: Team){
        localStorage.setItem('selected_team_id',  '' + team.id);

        // this.router.navigate(['/admin/teams/member']);
    }



    public showCategories(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '1100px';
        dialogConfig.data = new Team();
        const dialogRef = this.dialog.open(TeamCategoriesComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
        });
    }
}
