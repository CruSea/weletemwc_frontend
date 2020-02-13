/**
 * Created by BENGEOS on 11/28/18.
 */
import {User} from "../users/users.objects";

export class Partner {
    public id: number;
    public user_id: number;
    public user: User;
    public full_name: string;
    public pledge_amount: string;
    public pledge_frequency: string;
    public city: string;
    public phone: string;
    public email: string;
    public status: boolean;
    public country: string;
    public address: string;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.user_id = null;
        this.user = new User();
        this.full_name = '';
        this.pledge_amount = '';
        this.pledge_frequency = '';
        this.city = '';
        this.phone = '';
        this.email = '';
        this.status = false;
        this.country = '';
        this.address = '';
        this.created_at = '';
        this.updated_at = '';
    }
}
export class PaginatedPartners {
    public data: Partner[];
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