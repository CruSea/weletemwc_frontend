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
    public is_baptized: string;
    public baptized_date: string;
    public gender: string;
    public nationality: string;
    public address: string;
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
        this.baptized_date = '';
        this.is_baptized = '';
        this.gender = '';
        this.nationality = '';
        this.address = '';
        this.created_at = '';
        this.updated_at = '';
    }
}
export class PaginatedSpouse {
    public data: Spouse[];
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