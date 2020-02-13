/**
 * Created by ROGER on 09/24/19.
 */
export class UserRole {
    public id: number;
    public name: string;
    public display_name: string;
    public description: string;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.display_name = '';
        this.description = '';
        this.created_at = '';
        this.updated_at = '';
    }
}
export class UserPermission {
    public id: number;
    public name: string;
}
export class UserType {
    public id: number;
    public name: string;
    public description: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
    }
}
export class User {
    public id: number;
    public full_name: string;
    public email: string;
    public phone: string;
    public password: string;
    public user_role_id: number;
    public user_type_id: number;
    public user_type: UserType;
    public roles: UserRole[];
    public user_permissions: UserPermission[];
    public status: boolean;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = 0;
        this.full_name = '';
        this.email = '';
        this.phone = '';
        this.password = '';
        this.user_role_id = null;
        this.user_type_id = null;
        this.user_type = new UserType();
        this.roles = [];
        this.user_permissions = [];
        this.status = false;
        this.created_at = '';
        this.updated_at = '';
    }
}
export class PaginatedUsers {
    public data: User[];
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