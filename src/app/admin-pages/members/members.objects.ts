/**
 * Created by BENGEOS on 11/28/18.
 */
export class Member {

    public id: number;
    public full_name: string;
    public member_id: string;
    public photo_url: string;
    public image_file: any;
    public image_file_name: string;
    public city: string;
    public sub_city: string;
    public wereda: string;
    public house_number: string;
    public baptized_church: string;
    public church_group_place: string;
    public living_status: string;
    public living_status_other: string;
    public phone_cell: string;
    public phone_work: string;
    public phone_home: string;
    public email: string;
    public birth_day: string;
    public birth_place: string;
    public occupation: string;
    public education_level: string;
    public employment_position: string;
    public gender: string;
    public salvation_date: string;
    public salvation_church: string;
    public is_baptized: string;
    public baptized_date: string;
    public nationality: string;
    public marital_status: string;
    public emergency_contact_name: string;
    public emergency_contact_phone: string;
    public emergency_contact_subcity: string;
    public emergency_contact_house_no: string;
    public have_family_fellowship: boolean;
    public status: boolean;
    public address: string;
    public spouse: Spouse;
    public children: Children [];
    public member_previous_church: MemberPreviousChurch;
    public created_at: string;
    public updated_at: string;

    constructor() {
        this.id = null;
        this.member_id = '';
        this.full_name = '';
        this.photo_url = '';
        this.image_file = null;
        this.city = '';
        this.sub_city = '';
        this.wereda = '';
        this.house_number = '';
        this.living_status = '';
        this.living_status_other = '';
        this.church_group_place = '';
        this.phone_cell = '';
        this.phone_work = '';
        this.phone_home = '';
        this.email = '';
        this.birth_day = '';
        this.birth_place = '';
        this.occupation = '';
        this.education_level = '';
        this.employment_position = '';
        this.gender = '';
        this.salvation_date = '';
        this.salvation_church = '';
        this.is_baptized = '';
        this.baptized_date = '';
        this.baptized_church = '';
        this.nationality = '';
        this.marital_status = '';
        this.emergency_contact_name = '';
        this.emergency_contact_house_no = '';
        this.emergency_contact_phone = '';
        this.emergency_contact_subcity = '';
        this.have_family_fellowship = false;
        this.status = true;
        this.address = '';
        this.spouse = new Spouse();
        this.children = [];
        this.member_previous_church = new MemberPreviousChurch();
        this.created_at = '';
        this.updated_at = '';
    }

}
export class PaginatedMembers {
    public data: Member[];
    public first_page_url: string;
    public last_page_url: string;
    public next_page_url: string;
    public prev_page_url: string;
    public path: string;
    public current_page: number;
    public per_page: number;
    public last_page: number;
    public total: number;
    public from: number;
    public to: number;
    constructor() {
        this.data = [];
        this.first_page_url = '';
        this.last_page_url = '';
        this.next_page_url = '';
        this.prev_page_url = '';
        this.path = '';
        this.current_page = 0;
        this.per_page = 0;
        this.last_page = 0;
        this.total = 0;
        this.from = 0;
        this.to = 0;
    }
}
export class Spouse {
    public id: number;
    public member_id: number;
    public full_name: string;
    public city: string;
    public phone_cell: string;
    public phone_work: string;
    public phone_home: string;
    public email: string;
    public birth_day: string;
    public occupation: string;
    public employment_place: string;
    public employment_position: string;
    public gender: string;
    public nationality: string;
    public address: string;
    public salvation_date: string;
    public is_baptized: string;
    public baptized_date: string;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.member_id = null;
        this.full_name = '';
        this.city = '';
        this.phone_cell = '';
        this.phone_work = '';
        this.phone_home = '';
        this.email = '';
        this.birth_day = '';
        this.occupation = '';
        this.employment_place = '';
        this.employment_position = '';
        this.gender = '';
        this.nationality = '';
        this.address = '';
        this.salvation_date = '';
        this.is_baptized = '';
        this.baptized_date = '';
        this.created_at = '';
        this.updated_at = '';
    }
}
export class Children {
    public id: number;
    public member_id: number;
    public full_name: string;
    public birthday: string;
    public gender: string;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.member_id = null;
        this.full_name = '';
        this.birthday = '';
        this.gender = '';
        this.created_at = '';
        this.updated_at = '';
    }
}
export class MemberPreviousChurch {
    public id: number;
    public member_id: number;
    public church_name: string;
    public leaving_reason: string;
    public was_member: string;
    public duration: string;
    public image_url: string;
    public image_file: any;
    public image_file_name: string;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.member_id = null;
        this.church_name = '';
        this.leaving_reason = '';
        this.was_member = '';
        this.duration = '';
        this.image_url = '';
        this.image_file = null;
        this.created_at = '';
        this.updated_at = '';
    }
 }
