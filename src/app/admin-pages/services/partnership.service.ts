import {EventEmitter, Injectable} from '@angular/core';
import {HttpRequestService} from "../../services/http-request.service";
import {AuthService} from "../../services/auth.service";
import {
    PaginatedPartners, Partner,
} from "../partnership/partnership.objects";
import {PaginatedMembers} from "../members/members.objects";

@Injectable({
  providedIn: 'root'
})
export class PartnershipService {
    public PaginatedPartnershipDatatEmitter = new EventEmitter<PaginatedPartners>();
    // public UserRoleListEmitter = new EventEmitter<UserRole[]>();
    constructor(private httpService: HttpRequestService, private authService: AuthService) { }
    public getAllPaginatedPartnershipData() {
        return this.httpService.sendGetRequest('all_partnerships?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedPartnershipData(data); console.log('partners: ', data)},
                error => { console.log(error); },
            );
    }
    public getPaginatedPartnerAll(path: any ) {
        return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedPartnershipData(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }
    public getPaginatedPartnerRequests() {
        return this.httpService.sendGetRequest('partnership_requests?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedPartnershipData(data); console.log('requests: ', data)},
                error => { console.log(error); },
            );
    }
    public getPaginatedPartners() {
        return this.httpService.sendGetRequest('partners?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedPartnershipData(data); console.log('requests: ', data)},
                error => { console.log(error); },
            );
    }
    private processGetPaginatedPartnershipData(media_data) {
        if (media_data && media_data.status && media_data.partnership_data) {
            console.log('found partnership_requests: ', media_data.partnership_data);
            this.PaginatedPartnershipDatatEmitter.emit(media_data.partnership_data);
        }
    }
    public updatePartner(partner_data: Partner) {
        const new_header = new Headers();
        return this.httpService.sendPutRequest('approve_partnership?token=' + this.authService.getUserToken(), partner_data, new_header);
    }
     public approvePartnerShip(request: Partner) {
        const new_header = new Headers();
        console.log(request);
        return this.httpService.sendPutRequest('approve_partnership?token=' + this.authService.getUserToken(), request, new_header);
    }
    public addPartner(request: Partner) {
        const new_header = new Headers();
        console.log(request);
        return this.httpService.sendPostRequest('partner_admin?token=' + this.authService.getUserToken(), request, new_header);
    }
    public deletePartner(request: Partner) {
        return this.httpService.sendDeleteRequest('partner/' + request.id + '?token=' + this.authService.getUserToken());
    }

}
