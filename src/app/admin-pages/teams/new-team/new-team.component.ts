import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Team, TeamCategory} from "../team.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeamService} from "../../services/team-service";

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.scss']
})
export class NewTeamComponent implements OnInit {

    public new_team = new Team();
    public team_categories: TeamCategory[] = [];

    constructor(public dialogRef: MatDialogRef <NewTeamComponent>,
                @Inject(LOCALE_ID) private locale: string,
                @Inject(MAT_DIALOG_DATA) new_team: Team,
                private teamService: TeamService) {
    }
    ngOnInit() {

      this.teamService.TeamCategories.subscribe(
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
    public addTeam() {
        this.dialogRef.close(this.new_team);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
