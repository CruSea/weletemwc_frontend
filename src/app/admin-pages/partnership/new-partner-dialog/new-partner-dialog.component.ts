import {Component, Inject, OnInit} from '@angular/core';
import {Partner} from "../partnership.objects";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {PartnershipService} from "../../services/partnership.service";

@Component({
  selector: 'app-new-partner-dialog',
  templateUrl: './new-partner-dialog.component.html',
  styles: []
})
export class NewPartnerDialogComponent implements OnInit {

    public new_partner_data = new Partner();
    constructor(public dialogRef: MatDialogRef<NewPartnerDialogComponent>,
                public partnershipService: PartnershipService,
                @Inject(MAT_DIALOG_DATA) selected_partner: Partner) {

    }

  ngOnInit() {
  }

    public addPartner() {
        this.new_partner_data.status = true;
        this.dialogRef.close(this.new_partner_data);
    }
}
