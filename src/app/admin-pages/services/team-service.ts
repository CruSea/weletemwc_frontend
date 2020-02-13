import {EventEmitter, Injectable} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';
import {AuthService} from '../../services/auth.service';
import {Headers} from "@angular/http";
import {
    PaginatedTeamCategories, PaginatedTeamMembers, PaginatedTeams, Team, TeamCategory,
    TeamMember
} from "../teams/team.objects";
import {Member} from "../members/members.objects";

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  public PaginatedTeamData = new EventEmitter<PaginatedTeams>();
  public PaginatedTeamMembersData = new EventEmitter<PaginatedTeamMembers>();
  public PaginatedTeamLeadersData = new EventEmitter<PaginatedTeamMembers>();

  public PaginatedTeamCategories = new EventEmitter<PaginatedTeamCategories>();
  public TeamCategories = new EventEmitter<TeamCategory[]>();
    public teamLeadersEvent = new EventEmitter<Boolean>();

  constructor(private httpService: HttpRequestService, private authService: AuthService) { }

    public getRootUrl() {
      return this.httpService.getRootUrl();
    }

      /**
       * Team Members
       */

    public getPaginatedTeamsData() {
       return this.httpService.sendGetRequest('teams?token=' + this.authService.getUserToken())
          .subscribe(
              data => { this.processGetPaginatedTeamsData(data); console.log('teams: ', data)},
              error => { console.log(error); },
          );
    }

    public getPaginatedTeamsAll(path: any ) {
        return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamsData(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

    private processGetPaginatedTeamsData(data) {
      if (data && data.status && data.result) {
        this.PaginatedTeamData.emit(data.result);
      }
    }

    public addNewTeam(data: Team) {
      const headers = new Headers();
      const formData: FormData = new FormData();
      console.log('Uploading team ...');
      formData.append('name', data.name);
      formData.append('description', data.description);
      formData.append('parent_team_id', data.parent_team_id + '');
      formData.append('category_id', data.category_id + '');
      return this.httpService.sendPostRequest('team?token=' + this.authService.getUserToken(), formData, headers);
    }

    public updateTeam(data: Team) {
      const headers = new Headers();
      return this.httpService.sendPostRequest('team/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public deleteTeam(data: Team) {
      return this.httpService.sendDeleteRequest('team/' + data.id + '?token=' + this.authService.getUserToken());
    }

    /**
     * Team Members
     */

    public getPaginatedTeamMembersData() {
        this.httpService.sendGetRequest('team_members?team_id=' + this.authService.getSelectedTeam() + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamMembersData(data); console.log('teams: ', data)},
                error => { console.log(error); },
            );
    }


    public getPaginatedTeamMemberAll(path: any ) {
        return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamMembersData(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

    private processGetPaginatedTeamMembersData(data) {
        if (data && data.status && data.result) {
            this.PaginatedTeamMembersData.emit(data.result);
        }
    }

    public getPaginatedSearchTeamMembers(searchText: string ) {
        return this.httpService.sendGetRequest('team_member/search?search=' +  searchText + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamMembersData(data);},
                error => { console.log(error); },
            );
    }

    public addNewTeamMember(data: Member) {
        var team_member = new TeamMember();
        team_member.team_id = parseInt(this.authService.getSelectedTeam());
        team_member.member_id = data.id;
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member?token=' + this.authService.getUserToken(), team_member, headers);
    }

    public updateTeamMember(data: TeamMember) {
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public deleteTeamMember(data: TeamMember) {
        return this.httpService.sendDeleteRequest('team_member/' + data.id + '?token=' + this.authService.getUserToken());
    }


    /**
     * Team Leaders
     */

    public updateTeamLeaders(data: TeamMember) {
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public addTeamLeader(data: TeamMember) {
        data.is_leader = true;
        data.is_main_leader = false;
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public deleteTeamLeader(data: TeamMember) {
        data.is_leader = false;
        data.is_main_leader = false;
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public updateTeamLeader(data: TeamMember) {
        const headers = new Headers();
        this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers)
            .subscribe(
                data => {this.teamLeadersEvent.emit(true);}
            );
    }

    public addMainLeader(data: TeamMember) {
        data.is_leader = true;
        data.is_main_leader = true;
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public deleteMainTeamLeader(data: TeamMember) {
        data.is_leader = true;
        data.is_main_leader = false;
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_member/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public getPaginatedTeamLeadersData() {
        this.httpService.sendGetRequest('team_member/leaders?team_id=' + this.authService.getSelectedTeam() + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamLeadersData(data); console.log('teams: ', data)},
                error => { console.log(error); },
            );
    }

    private processGetPaginatedTeamLeadersData(data) {
        if (data && data.status && data.result) {
            this.PaginatedTeamLeadersData.emit(data.result);
        }
    }


    /**
     * Team Categories
     */


    public getPaginatedTeamCategoriesAll(path: any ) {
        return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamCategoriesData(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

    public getPaginatedTeamCategoriesData() {
        this.httpService.sendGetRequest('team_categories/paginated?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedTeamCategoriesData(data); console.log('teams: ', data)},
                error => { console.log(error); },
            );
    }

    private processGetPaginatedTeamCategoriesData(data) {
        if (data && data.status && data.result) {
            this.PaginatedTeamCategories.emit(data.result);
        }
    }

    public getTeamCategories() {
        this.httpService.sendGetRequest('team_categories?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processTeamCategoryData(data); console.log('teams: ', data)},
                error => { console.log(error); },
            );
    }

    private processTeamCategoryData(data) {
        if (data && data.status && data.result) {
            this.TeamCategories.emit(data.result);
        }
    }

    public addNewTeamCategory(data: TeamCategory) {
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_category?token=' + this.authService.getUserToken(), data, headers);
    }

    public updateTeamCategory(data: TeamCategory) {
        const headers = new Headers();
        return this.httpService.sendPostRequest('team_category/update?token=' + this.authService.getUserToken(), data, headers);
    }

    public deleteTeamCategory(data: TeamCategory) {
        return this.httpService.sendDeleteRequest('team_category/' + data.id + '?token=' + this.authService.getUserToken());
    }

}
