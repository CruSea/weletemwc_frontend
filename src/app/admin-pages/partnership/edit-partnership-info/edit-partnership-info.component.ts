import {Component, Inject, OnInit} from '@angular/core';
import {Partner} from "../partnership.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {PartnershipService} from "../../services/partnership.service";

@Component({
  selector: 'app-edit-partnership-info',
  templateUrl: './edit-partnership-info.component.html',
  styles: []
})
export class EditPartnershipInfoComponent implements OnInit {

    public selected_partner_data = new Partner();
    constructor(public dialogRef: MatDialogRef<EditPartnershipInfoComponent>,
                public partnershipService: PartnershipService,
                @Inject(MAT_DIALOG_DATA) selected_partner: Partner) {
        this.selected_partner_data = selected_partner;
    }

  ngOnInit() {
  }
    public updatePartner() {
        this.dialogRef.close(this.selected_partner_data);
    }
    public cancel() {
        this.dialogRef.close();
    }
}
