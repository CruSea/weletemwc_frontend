import {Injectable, EventEmitter} from '@angular/core';
import {HttpRequestService} from "../../services/http-request.service";
import {AuthService} from "../../services/auth.service";
import {PaginatedMembers, Member, MemberPreviousChurch, Children} from "../members/members.objects";
import {Headers} from "@angular/http";
import {Spouse} from "../members/spouse-info.objects";

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  public PaginatedMembersEmitter = new EventEmitter<PaginatedMembers>();
  public selected_member_emitter = new EventEmitter<Member>();
  // public MemberRoleListEmitter = new EventEmitter<UserRole[]>();
  constructor(private httpService: HttpRequestService, private authService: AuthService) { }

  public getPaginatedMembers(path: any ) {
    return this.httpService.sendGetRequest('members?token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
            error => { console.log(error); },
        );
  }
    public getPaginatedSearchMembers(searchText: string ) {
        return this.httpService.sendGetRequest('search_members?search=' +  searchText + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

    public getPaginatedSearchMembersDetail(searchText: string, searchType: string ) {
        return this.httpService.sendGetRequest('search_members_detail?search=' +  searchText + '&search_type=' + searchType + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

  public getPaginatedMemberAll(path: any ) {
    return this.httpService.sendCustomGetRequest(path + '&token=' + this.authService.getUserToken())
        .subscribe(
            data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
            error => { console.log(error); },
        );
  }
    public getMembersData() {
        return this.httpService.sendGetRequest('members?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

    public getSingleMembersData(member_id) {
      console.log("Getting data for " + member_id);
       this.httpService.sendGetRequest('member/' + member_id +  '?token=' + this.authService.getUserToken()).subscribe(
           data => {
               this.processGetSingleMember(data);
           },
           error => {

           }
       );
    }

    public processGetSingleMember(data){
      if(data && data.result){
          this.selected_member_emitter.emit(data.result);
      }
    }


    public getPaginatedSearchMembersNotInTeam(searchText: string ) {
        return this.httpService.sendGetRequest('search_members_not_in_team?team_id=' + this.authService.getSelectedTeam() + '&search=' +  searchText + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }

    public getAllMembersNotInTeam() {
        return this.httpService.sendGetRequest('members/not_in_team?team_id=' + this.authService.getSelectedTeam() + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data);},
                error => { console.log(error); },
            );
    }


    public getMembershipRequests() {
        return this.httpService.sendGetRequest('membership_requests?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('members: ', data)},
                error => { console.log(error); },
            );
    }
    public getPartnersData() {
        return this.httpService.sendGetRequest('partners?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('partners: ', data)},

            );
    }
    public getPublicUserData() {
        return this.httpService.sendGetRequest('public_users?token=' + this.authService.getUserToken())
            .subscribe(
                data => { this.processGetPaginatedMembers(data); console.log('public_users: ', data)},

            );
    }
    public importMember(import_file: any){
        const new_header = new Headers();
         return this.httpService.sendPostRequest('import?token=' + this.authService.getUserToken(), import_file, new_header );
    }
  private processGetPaginatedMembers(media_data) {
    if (media_data && media_data.status && media_data.members_data) {
      console.log('found members: ', media_data.members_data);
      this.PaginatedMembersEmitter.emit(media_data.members_data);
    }
  }

  public addNewMember(member_data: Member) {
    const new_header = new Headers();
      const formData: FormData = new FormData();
      formData.append('image_file', member_data.image_file, member_data.image_file_name);
      formData.append('full_name', member_data.full_name);
      formData.append('photo_url', member_data.photo_url);
      formData.append('city', member_data.city);
      formData.append('sub_city', member_data.sub_city);
      formData.append('wereda', member_data.wereda);
      formData.append('house_number', member_data.house_number);
      formData.append('living_status', member_data.living_status);
      formData.append('living_status_other', member_data.living_status_other);
      formData.append('baptized_church', member_data.baptized_church);
      formData.append('baptized_date', member_data.baptized_date);
      formData.append('is_baptized', member_data.is_baptized);
      formData.append('church_group_place', member_data.church_group_place);
      formData.append('birth_place', member_data.birth_place);
      formData.append('emergency_contact_name', member_data.emergency_contact_name);
      formData.append('emergency_contact_phone', member_data.emergency_contact_phone);
      formData.append('emergency_contact_subcity', member_data.emergency_contact_subcity);
      formData.append('emergency_contact_house_no', member_data.emergency_contact_house_no);
      formData.append('phone_cell', member_data.phone_cell);
      formData.append('phone_work', member_data.phone_work);
      formData.append('phone_home', member_data.phone_home);
      formData.append('email', member_data.email);
      formData.append('birth_day', member_data.birth_day);
      formData.append('occupation', member_data.occupation);
      formData.append('education_level', member_data.education_level);
      formData.append('employment_position', member_data.employment_position);
      formData.append('gender', member_data.gender);
      formData.append('nationality', member_data.nationality);
      formData.append('marital_status', member_data.marital_status);
      formData.append('address', member_data.address);
      formData.append('salvation_date', member_data.salvation_date);
      formData.append('salvation_church', member_data.salvation_church);

      if(member_data.have_family_fellowship){
          formData.append('have_family_fellowship', '1');
      }
      else{
          formData.append('have_family_fellowship', '0');
      }

    return this.httpService.sendPostRequest('new_member?token=' + this.authService.getUserToken(), formData, new_header);
  }
  public addNewMember2(member_data: Member) {
    const new_header = new Headers();
      return this.httpService.sendPostRequest('new_member?token=' + this.authService.getUserToken(), member_data, new_header);
  }
  public addNewSpouseInfo(spouse_data: Spouse) {
    const new_header = new Headers();
    return this.httpService.sendPostRequest('member_spouse_admin?token=' + this.authService.getUserToken(), spouse_data, new_header);
  }
  public addNewChildInfo(child_data: Children) {
        const new_header = new Headers();
        return this.httpService.sendPostRequest('member_children?token=' + this.authService.getUserToken(), child_data, new_header);
    }

  public addPreviousChurchInfo(church_data: MemberPreviousChurch) {
        const new_header = new Headers();
      const formData: FormData = new FormData();
      console.log('Uploading Playlist ...');
      formData.append('member_id', '' + church_data.member_id);
      formData.append('church_name', church_data.church_name);
      formData.append('leaving_reason', church_data.leaving_reason);
      formData.append('was_member', church_data.was_member);
      formData.append('duration', church_data.duration);
      formData.append('image_file', church_data.image_file, church_data.image_file_name);
        return this.httpService.sendPostRequest('member_previous_church_admin?token=' + this.authService.getUserToken(), formData, new_header);
    }

  public updateMember(member_data: Member) {
      const new_header = new Headers();
      const formData: FormData = new FormData();
      formData.append('id', member_data.id + '');
      formData.append('full_name', member_data.full_name);
      formData.append('photo_url', member_data.photo_url);
      formData.append('city', member_data.city);
      formData.append('sub_city', member_data.sub_city);
      formData.append('wereda', member_data.wereda);
      formData.append('house_number', member_data.house_number);
      formData.append('living_status', member_data.living_status);
      formData.append('living_status_other', member_data.living_status_other);
      formData.append('baptized_church', member_data.baptized_church);
      formData.append('baptized_date', member_data.baptized_date);
      formData.append('is_baptized', member_data.is_baptized);
      formData.append('church_group_place', member_data.church_group_place);
      formData.append('birth_place', member_data.birth_place);
      formData.append('emergency_contact_name', member_data.emergency_contact_name);
      formData.append('emergency_contact_phone', member_data.emergency_contact_phone);
      formData.append('emergency_contact_subcity', member_data.emergency_contact_subcity);
      formData.append('emergency_contact_house_no', member_data.emergency_contact_house_no);
      formData.append('phone_cell', member_data.phone_cell);
      formData.append('phone_work', member_data.phone_work);
      formData.append('phone_home', member_data.phone_home);
      formData.append('email', member_data.email);
      formData.append('birth_day', member_data.birth_day);
      formData.append('occupation', member_data.occupation);
      formData.append('education_level', member_data.education_level);
      formData.append('employment_position', member_data.employment_position);
      formData.append('gender', member_data.gender);
      formData.append('nationality', member_data.nationality);
      formData.append('marital_status', member_data.marital_status);
      formData.append('address', member_data.address);
      formData.append('salvation_date', member_data.salvation_date);
      formData.append('salvation_church', member_data.salvation_church);

      if(member_data.have_family_fellowship){
          formData.append('have_family_fellowship', '1');
      }
      else{
          formData.append('have_family_fellowship', '0');
      }

      if (member_data.image_file != null) {
          formData.append('image_file', member_data.image_file, member_data.image_file_name);
      }
    return this.httpService.sendPostRequest('member_update?token=' + this.authService.getUserToken(), formData, new_header);


    }
  public updateSpouseInfo(member_data: Spouse) {
    const new_header = new Headers();
    return this.httpService.sendPutRequest('member_spouse_info?token=' + this.authService.getUserToken(), member_data, new_header);
  }
  public updateChildInfo(member_data: Children) {
    const new_header = new Headers();
    return this.httpService.sendPutRequest('member_children_info?token=' + this.authService.getUserToken(), member_data, new_header);
  }

  public updatePreviousChurchInfo(member_data: MemberPreviousChurch) {
    // const new_header = new Headers();
    // return this.httpService.sendPutRequest('member_previous_church_update?token=' + this.authService.getUserToken(), member_data, new_header);

    const new_header = new Headers();
    const formData: FormData = new FormData();
    console.log('Uploading Playlist ...');
    formData.append('id', '' + member_data.id);
    formData.append('member_id', '' + member_data.member_id);
    formData.append('church_name', member_data.church_name);
    formData.append('leaving_reason', member_data.leaving_reason);
    formData.append('was_member', member_data.was_member);
    formData.append('duration', member_data.duration);


      if (member_data.image_file != null) {
          formData.append('image_file', member_data.image_file, member_data.image_file_name);

      }


      return this.httpService.sendPostRequest('member_previous_church_update_2?token=' + this.authService.getUserToken(), formData, new_header);

    }
  // public changeUserStatus(member_data: Member) {
  //   const new_header = new Headers();
  //   console.log(member_data);
  //   return this.httpService.sendPostRequest('member_status?token=' + this.authService.getUserToken(), member_data, new_header);
  // }
  public deleteMember(member_data: Member) {
    return this.httpService.sendDeleteRequest('member/' + member_data.id + '?token=' + this.authService.getUserToken());
  }
  public deleteChild(member_data: Children ) {
    return this.httpService.sendDeleteRequest('member_child/' + member_data.id + '?token=' + this.authService.getUserToken());
  }

}
