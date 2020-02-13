import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {MembersService} from "../../services/members.service";
import {Children, Member, MemberPreviousChurch, Spouse} from "../members.objects";
import {HttpRequestService} from "../../../services/http-request.service";

@Component({
  selector: 'app-view-spouse-info',
  templateUrl: './view-member-info.component.html',
  styles: ['form.dotted {border-style: dotted;}}']
})
export class ViewMemberInfoComponent implements OnInit {
    public selected_member_data = new Member();
    public has_spouse = false;
    public has_child = false;
    public had_church = false;
    constructor(private membersService: MembersService,
                private _formBuilder: FormBuilder,
                public dialogRef: MatDialogRef<ViewMemberInfoComponent>,
                @Inject(MAT_DIALOG_DATA) selected_member: Member) {
        this.selected_member_data = selected_member;
        if (this.selected_member_data.spouse == null) {
            this.has_spouse = false;
            this.selected_member_data.spouse = new Spouse();
        } else{
            this.has_spouse = true;
        }
        if(this.selected_member_data.children != null && this.selected_member_data.children.length === 0) {
            this.has_child = false;
            this.selected_member_data.children = [];
        } else {
             this.has_child = true;
        }
        if(this.selected_member_data.member_previous_church == null) {
            this.had_church = false;
            this.selected_member_data.member_previous_church = new MemberPreviousChurch();
        } else {
             this.had_church = true;
        }
    }

  ngOnInit() {
        console.log(this.selected_member_data.member_previous_church);

  }
    public cancel() {
        this.dialogRef.close();
    }
}
