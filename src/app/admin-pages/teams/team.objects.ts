/**
 * Created By Rog
 */
import {User} from "../users/users.objects";
import {Member} from "../members/members.objects";

export class Team {
    public id: number;
    public name: string;
    public description: string;
    public parent_team_id: number;
    public category_id: number;
    public created_by: number;
    public status: boolean;
    public user: User;
    public category: TeamCategory;
    public parent_team: Team;
    public team_member: TeamMember[];
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.parent_team_id = null;
        this.category_id = null;
        this.created_by = null;
        // this.parent_team = new Team();
        this.user = new User();
        this.category = new TeamCategory();
        this.team_member = [];
        this.created_at = '';
        this.updated_at = '';
    }
}

export class PaginatedTeams {
    public data: Team[];
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

export class TeamCategory {
    public id: number;
    public name: string;
    public description: string;
    public created_at: string;
    public updated_at: string;

    constructor() {
        this.id = null;
        this.name = '';
        this.description = '';
        this.created_at = '';
        this.updated_at = '';
    }
}



export class PaginatedTeamCategories {
    public data: TeamCategory[];
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


export class TeamMember {
    public id: number;
    public team_id: number;
    public member_id: number;
    public is_leader: boolean;
    public is_main_leader: boolean;
    public status: boolean;
    public team: Team;
    public members: Member;
    public created_at: string;
    public updated_at: string;
    constructor() {
        this.id = null;
        this.team_id = null;
        this.member_id = null;
        this.is_leader = false;
        this.is_main_leader = false;
        this.team = new Team();
        this.members = new Member();
        this.created_at = '';
        this.updated_at = '';
    }
}

export class PaginatedTeamMembers {
    public data: TeamMember[];
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