import {EventEmitter, Injectable} from '@angular/core';
import {PaginatedUsers, User, UserRole} from '../users/users.objects';
import {HttpRequestService} from '../../services/http-request.service';
import {AuthService} from '../../services/auth.service';
import {Headers} from "@angular/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public PaginatedUsersEmitter = new EventEmitter<PaginatedUsers>();
  public UserRoleListEmitter = new EventEmitter<UserRole[]>();
  constructor(private httpService: HttpRequestService, private authService: AuthService) { }
  public getPaginatedUsers() {
    return this.httpService.sendGetRequest('users?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetPaginatedUsers(data); console.log('users: ', data)},
            error => { console.log(error); },
        );
  }
  private processGetPaginatedUsers(media_data) {
    if (media_data && media_data.status && media_data.users) {
      console.log('found users: ', media_data.users);
      this.PaginatedUsersEmitter.emit(media_data.users);
    }
  }
    public getPaginatedUsersAll(path: any ) {
        return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedUsers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }
  public addNewUser(user_data: User) {
    const new_header = new Headers();
    return this.httpService.sendPostRequest('user?token=' + this.authService.getUserToken(), user_data, new_header);
  }
  public updateUser(user_data: User) {
    const new_header = new Headers();
    return this.httpService.sendPutRequest('user?token=' + this.authService.getUserToken(), user_data, new_header);
  }
  public changeUserStatus(user_data: User) {
    const new_header = new Headers();
    console.log(user_data);
    return this.httpService.sendPostRequest('user_status?token=' + this.authService.getUserToken(), user_data, new_header);
  }
  public deleteUser(user_data: User) {
    return this.httpService.sendDeleteRequest('user/' + user_data.id + '?token=' + this.authService.getUserToken());
  }
  public getUserRoleListData() {
    return this.httpService.sendGetRequest('user_roles?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetUserRoleList(data); console.log('users: ', data)},
            error => { console.log(error); },
        );
  }
  private processGetUserRoleList(users_data) {
    if (users_data && users_data.status && users_data.user_roles) {
      this.UserRoleListEmitter.emit(users_data.user_roles);
    }
  }
}
