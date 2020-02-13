import { Component, OnInit } from '@angular/core';
import {PaginatedMembers} from "../members/members.objects";
import {PartnershipService} from "../services/partnership.service";
import {Partner} from "./partnership.objects";
import swal from 'sweetalert2';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {ViewPartnershipRequestComponent} from "./view-partnership-request/view-partnership-request.component";
import {NewPartnerDialogComponent} from "./new-partner-dialog/new-partner-dialog.component";
import {EditPartnershipInfoComponent} from "./edit-partnership-info/edit-partnership-info.component";
import {DashboardService} from "../services/dashboard.service";
import {PartnerDashboard} from "../dashboard/dashboard.objects";
declare var $: any;
@Component({
  selector: 'app-partnership-request',
  templateUrl: './partnership.component.html',
    styles:[ '.zoom { transition: transform .2s;  } .zoom:hover { -ms-transform: scale(1.1); -webkit-transform: scale(1.1); transform: scale(1.1);  }']
})
export class PartnershipComponent implements OnInit {
    public paginated_partnership_data = new PaginatedMembers();
    public selected_partner = new PaginatedMembers();
    public partners_dashboard_data = new PartnerDashboard();
    public filter_activate = true;
    public loading = false;
  constructor(public dashboardService: DashboardService, public partnershipService: PartnershipService, private dialog: MatDialog) { }

  ngOnInit() {
      this.loading = true;
      this.updatePartnerShipComponent();
      this.partnershipService.PaginatedPartnershipDatatEmitter.subscribe(
          data => {this.paginated_partnership_data = data;  this.loading = false; }
      );
      this.dashboardService.PartnerDashboardDataEmitter.subscribe(
          data => {this.partners_dashboard_data = data;  console.log(data)}
      );
  }
        public updatePartnerShipComponent() {
         this.dashboardService.getPartnerDashboardData();
          if (this.filter_activate) {
              this.partnershipService.getPaginatedPartners();
          } else {
              this.partnershipService.getPaginatedPartnerRequests();
          }
        }

    public updatePartnerDataList(event: any) {
        console.log(event);
        const page_num = event.pageIndex + 1;
        const paginate_size = event.pageSize;
        // this.paginated_recorded_files.current_page = event.page;
        this.partnershipService.getPaginatedPartnerAll(this.paginated_partnership_data.path + '?page=' + page_num + '&PAGINATE_SIZE=' + paginate_size);
    }
        public  getPartners() {
            this.loading = true;
            this.filter_activate = true;
            this.partnershipService.getPaginatedPartners();

        }
        public  getPartnershipRequests() {
             this.loading = true;
             this.filter_activate = false;
             this.partnershipService.getPaginatedPartnerRequests();
        }
    public viewPartnerInfoDialog(selected_partner: Partner): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        // dialogConfig.height = '600px';
        dialogConfig.data = selected_partner;
        const dialogRef = this.dialog.open(ViewPartnershipRequestComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if ( result ) {
                this.loading = true;
                this.partnershipService.updatePartner(result).subscribe(
                    data => {
                        this.updatePartnerShipComponent();
                        swal(
                            {
                                title: 'Partner Info Updated!!!',
                                text: 'Partner  Updated Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    erro => {
                        swal({
                            title: 'Whoops! Failed To Update Partner',
                            text: erro.error.message,
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                        console.log(erro);
                        this.loading = false;
                    }
                );
            }
        });
    }
    public approvePartnerShip(partner_data: Partner) {
        partner_data.status = true;
        this.partnershipService.approvePartnerShip(partner_data).subscribe(
            data => {this.updatePartnerShipComponent();
                swal(
                    {
                        title: 'Member Added To Partnership List!',
                        text: 'Partner  Added Successfully.',
                        type: 'success',
                        confirmButtonColor: '#DD6B55'
                    })
            },
            error => {
                swal({
                    title: 'Whoops! Failed to Add',
                    text: 'Unable to Add this Partner',
                    animation: true,
                    confirmButtonColor: '#DD6B55',
                    customClass: 'animated tada'
                });
            }
        );
    }
    public adddPartnerDialog(): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.height = '800px';
        dialogConfig.data = new Partner();
        const dialogRef = this.dialog.open(NewPartnerDialogComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if ( result ) {
                this.loading = true;
                this.partnershipService.addPartner(result).subscribe(
                    data => {
                        this.updatePartnerShipComponent();
                        swal(
                            {
                                title: 'Partner Added To Partnership List!',
                                text: 'Partner  Added Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    erro => {
                        swal({
                            title: 'Whoops! Failed To Add Partner!!',
                            text: erro.error.message,
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                        console.log(erro);
                        this.loading = false;
                    }
                );
            }
        });
    }
    public updatePartnerDialog(selected_partner: Partner): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = true;
        dialogConfig.width = '800px';
        dialogConfig.data = selected_partner;
        const dialogRef = this.dialog.open(EditPartnershipInfoComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(result => {
            if ( result ) {
                this.loading = true;
                this.partnershipService.updatePartner(result).subscribe(
                    data => {
                        this.updatePartnerShipComponent();
                        swal(
                            {
                                title: 'Partner Info Updated!!!',
                                text: 'Partner  Updated Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    erro => {
                        swal({
                            title: 'Whoops! Failed To Update Partner',
                            text: erro.error.message,
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                        console.log(erro);
                        this.loading = false;
                    }
                );
            }
        });
    }
    public removePartner(partner_data: Partner) {
        swal({
                title: 'Are you sure?',
                text: 'Your will not be able to recover this Partner',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55', confirmButtonText: 'Yes, delete it!',
                cancelButtonText: 'No, cancel please!',
            },
        ).then((result) => {
            if (result.value) {
                this.loading = true;
                this.partnershipService.deletePartner(partner_data).subscribe(
                    data => {
                        this.showNotification(4, 'top', 'right', 'Partner  Deleted');
                        this.updatePartnerShipComponent();
                        swal(
                            {
                                title: 'Deleted!',
                                text: 'Partner  Deleted Successfully.',
                                type: 'success',
                                confirmButtonColor: '#DD6B55'
                            })
                    },
                    error => {
                        swal({
                            title: 'Whoops! Failed to Delete',
                            text: 'Unable to delete this Partner',
                            animation: true,
                            confirmButtonColor: '#DD6B55',
                            customClass: 'animated tada'
                        });
                    }
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
