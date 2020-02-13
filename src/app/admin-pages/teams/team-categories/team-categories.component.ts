import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {PaginatedTeamCategories, TeamCategory} from "../team.objects";
import {MAT_DIALOG_DATA, MatDialog, MatDialogConfig, MatDialogRef} from "@angular/material";
import {TeamService} from "../../services/team-service";
import {NewTeamCategoryComponent} from "./new-team-category/new-team-category.component";
import swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-team-categories',
  templateUrl: './team-categories.component.html',
  styleUrls: ['./team-categories.component.scss']
})
export class TeamCategoriesComponent implements OnInit {

    public team_categories: PaginatedTeamCategories = new PaginatedTeamCategories();
    public loading = false;

    constructor(public dialogRef: MatDialogRef <TeamCategoriesComponent>,
                @Inject(LOCALE_ID) private locale: string,
                private teamService: TeamService,
                private dialog: MatDialog) {
    }

    ngOnInit() {
        this.teamService.PaginatedTeamCategories.subscribe(
            data => {
                this.team_categories = data;
                this.loading = false;
            }, error => {

            }
        );

        this.getTeamCategories();
    }

    public getTeamCategories(){
        this.teamService.getPaginatedTeamCategoriesData();
    }

    public remove(teamCategory: TeamCategory) {
      this.teamService.deleteTeamCategory(teamCategory).subscribe(
          data => {
                  this.getTeamCategories();
        }, error=>{
        }
      );
    }

    public updateCategoriesList(event: any) {
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.teamService.getPaginatedTeamCategoriesAll(this.team_categories.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }


    public addTeam() {
        this.dialogRef.close();
    }

    public cancel() {
        this.dialogRef.close();
    }



    //add new Team Category
    public addCategory(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = new TeamCategory();
        const dialogRef = this.dialog.open(NewTeamCategoryComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loading = true;
                this.teamService.addNewTeamCategory(result).subscribe(
                    data => {
                        this.showNotification(2, 'top', 'right', 'Team Category Added');
                        this.getTeamCategories();
                    },
                    erro => {
                        this.showNotification(4, 'top', 'right', 'Can not add team category');
                        this.loading = false; }
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
