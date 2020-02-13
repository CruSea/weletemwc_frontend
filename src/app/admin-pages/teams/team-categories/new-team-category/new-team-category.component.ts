import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {TeamCategory} from "../../team.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {TeamService} from "../../../services/team-service";

@Component({
  selector: 'app-new-team-category',
  templateUrl: './new-team-category.component.html',
  styleUrls: ['./new-team-category.component.scss']
})
export class NewTeamCategoryComponent implements OnInit {

    public new_team_category = new TeamCategory();

    constructor(public dialogRef: MatDialogRef <NewTeamCategoryComponent>,
                @Inject(LOCALE_ID) private locale: string,
                @Inject(MAT_DIALOG_DATA) new_team_category: TeamCategory,
                private teamService: TeamService) {
    }
    ngOnInit() {
    }

    public addTeam() {
        this.dialogRef.close(this.new_team_category);
    }

    public cancel() {
        this.dialogRef.close();
    }

}
