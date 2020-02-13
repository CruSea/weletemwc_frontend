import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {PartnershipService} from "../../services/partnership.service";
import {Partner} from "../partnership.objects";

@Component({
  selector: 'app-view-partnership-request',
  templateUrl: './view-partnership-request.component.html',
  styles: []
})
export class ViewPartnershipRequestComponent implements OnInit {
    public selected_partner_data = new Partner();
    constructor(public dialogRef: MatDialogRef<ViewPartnershipRequestComponent>,
                public partnershipService: PartnershipService,
                @Inject(MAT_DIALOG_DATA) selected_partner: Partner) {
        this.selected_partner_data = selected_partner;
    }

  ngOnInit() {
  }
   public approvePartnerShip(){
       console.log(this.selected_partner_data);
       this.selected_partner_data.status = true;
       this.dialogRef.close(this.selected_partner_data);
   }

    public cancel() {
        this.dialogRef.close();
    }

}
