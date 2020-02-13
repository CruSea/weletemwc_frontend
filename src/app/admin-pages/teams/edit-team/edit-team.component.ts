import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Team, TeamCategory} from "../team.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeamService} from "../../services/team-service";

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.scss']
})
export class EditTeamComponent implements OnInit {

    public selected_team = new Team();
    public team_categories: TeamCategory[] = [];

    constructor(public dialogRef: MatDialogRef <EditTeamComponent>,
                @Inject(LOCALE_ID) private locale: string,
                @Inject(MAT_DIALOG_DATA) selected_team: Team,
                private teamService: TeamService)
    {
                this.selected_team = selected_team;
    }
    ngOnInit() {

        this.teamService.TeamCategories.subscribe (
            data => {
                this.team_categories = data;
            }, error => {

            }
        );

        this.getTeamCategories();
    }

    public getTeamCategories(){
        this.teamService.getTeamCategories();
    }

    public updateTeam() {
        this.dialogRef.close(this.selected_team);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
