/**
 * Created by BENGEOS on 11/26/18.
 */
export class ChartOption {
    public responsive: boolean;
    public maintainAspectRatio: boolean;
    public backgroundColor: any;
    public beginAtZero: boolean;
    public autoSkip: boolean;
    constructor() {
        this.responsive = false;
        this.maintainAspectRatio = false;
        this.backgroundColor = ['rgba(170, 25, 33, 1)', 'rgba(170, 25, 33, 1)'];
        this.beginAtZero = true;
        this.autoSkip = true;

    }
}
export class ChartColors {
    public fillColor: any;
    public strokeColor: any;
    public highlightFill: any;
    public highlightStroke: any;
    constructor() {
        this.fillColor = 'rgba(47, 132, 71, 0.8)';
        this.strokeColor = 'rgba(47, 132, 71, 0.8)';
        this.highlightFill = 'rgba(47, 132, 71, 0.8)';
        this.highlightStroke = 'rgba(47, 132, 71, 0.8)';
    }
}
export class ChartData {
    public data: number[];
    public label: string;
    constructor() {
        this.data = [];
        this.label = '';
    }
}

export class MainDashboard {
    public all_members: number;
    public all_team: number;
    public all_team_members: number;
    public all_system_users: number;
    constructor() {
        this.all_members = 0;
        this.all_team = 0;
        this.all_team_members = 0;
        this.all_system_users = 0;
    }
}

export class FeedsDashboard {
    public published_feeds: number;
    public not_published_feeds: number;
    public feeds_likes: number;
    public feeds_comments: number;
    constructor() {
        this.published_feeds = 0;
        this.not_published_feeds = 0;
        this.feeds_likes = 0;
        this.feeds_comments = 0;
    }
}
export class MemberDashboard {
    public all_members: number;
    public male_members: number;
    public female_members: number;
    constructor() {
        this.all_members = 0;
        this.male_members = 0;
        this.female_members = 0;
    }
}

export class TeamDashboard {
    public team_members: number;
    public team_leaders: number;
    public team_main_leaders: number;
    constructor() {
        this.team_members = 0;
        this.team_leaders = 0;
        this.team_main_leaders = 0;
    }
}

export class PrayerRequestDashboard {
    public prayer_requests: number;
    public prayer_requests_replied: number;
    public prayer_requests_not_replied: number;
    constructor() {
        this.prayer_requests = 0;
        this.prayer_requests_replied = 0;
        this.prayer_requests_not_replied = 0;
    }
}
export class PartnerDashboard {
    public all_partners: number;
    public partner_requests_approved: number;
    public partner_requests_not_approved: number;
    constructor() {
        this.all_partners = 0;
        this.partner_requests_approved = 0;
        this.partner_requests_not_approved = 0;
    }
}
export class MobileUserChartData {
    public date: string;
    public mobile_user_count: number;
    public mobile_user_registered_today: number[];
    public mobile_user_logged_in_today: number[];

    constructor() {
        this.mobile_user_count = 0;
        this.mobile_user_registered_today = [];
        this.mobile_user_logged_in_today = [];
    }
}
export class ChartObject {
    public labels: string[];
    public series: any[];
    public plugins: any[];
    constructor() {
        this.labels = [];
        this.series = [];
        this.plugins = [];
    }
}
export class DashboardListData {
    public start_date: string;
    public users_count: number[];
    public member_date: string[];
    constructor() {
        this.start_date = '';
        this.users_count = [];
        this.member_date = [];
    }
}

