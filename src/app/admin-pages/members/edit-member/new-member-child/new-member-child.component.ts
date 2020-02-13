import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {Children, Member} from "../../members.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-new-member-child',
  templateUrl: './new-member-child.component.html',
  styleUrls: ['./new-member-child.component.scss']
})
export class NewMemberChildComponent implements OnInit {
    public new_member_child_info = new Children();

    constructor(public dialogRef: MatDialogRef <NewMemberChildComponent>,
                @Inject(LOCALE_ID) private locale: string) {
    }
    ngOnInit() {

    }

    public addChild() {
        this.dialogRef.close(this.new_member_child_info);
    }

    public cancel() {
        this.dialogRef.close();
    }
}
