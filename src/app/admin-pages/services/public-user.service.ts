import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedUsers, User} from "../users/users.objects";
import {AuthService} from "../../services/auth.service";
import {HttpRequestService} from "../../services/http-request.service";

@Injectable({
  providedIn: 'root'
})
export class PublicUserService {
    public PaginatedMoblieUsersEmitter = new EventEmitter<PaginatedUsers>();
    constructor(private httpService: HttpRequestService, private authService: AuthService) { }
    public getPaginatedMoblieUsers() {
        return this.httpService.sendGetRequest('public_users?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMobileUsers(data); console.log('mobile_users: ', data)},
                error => { console.log(error); },
            );
    }
    public getPaginatedUsersAll(path: any ) {
        return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMobileUsers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }
    private processGetPaginatedMobileUsers(media_data) {
        if (media_data && media_data.status && media_data.users) {
            console.log('found users: ', media_data.users);
            this.PaginatedMoblieUsersEmitter.emit(media_data.users);
        }
    }
    // public updateUser(partner_data: Partner) {
    //     const new_header = new Headers();
    //     return this.httpService.sendPutRequest('approve_partnership?token=' + this.authService.getUserToken(), partner_data, new_header);
    // }
    public deleteUser(user_data: User) {
        return this.httpService.sendDeleteRequest('user/' + user_data.id + '?token=' + this.authService.getUserToken());
    }
}
