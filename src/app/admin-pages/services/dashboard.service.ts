import {EventEmitter, Injectable} from '@angular/core';
import {HttpRequestService} from '../../services/http-request.service';
import {AuthService} from '../../services/auth.service';
import {
    DashboardListData,
    FeedsDashboard,
    MainDashboard,
    MemberDashboard,
    MobileUserChartData, PartnerDashboard, TeamDashboard
} from '../dashboard/dashboard.objects';

class PrayerRequestDashboard {
}

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    public MainDashboardDataEmitter = new EventEmitter<MainDashboard[]>();  public FeedsDashboardDataEmitter = new EventEmitter<FeedsDashboard[]>();
    public PrayerRequestDashboardDataEmitter = new EventEmitter<PrayerRequestDashboard[]>();
    public PartnerDashboardDataEmitter = new EventEmitter<PartnerDashboard[]>();
    public DashboardUsersDailyDataEmitter = new EventEmitter<DashboardListData>();
    public MemberDashboardDataEmitter = new EventEmitter<MemberDashboard>();
    public TeamDashboardDataEmitter = new EventEmitter<TeamDashboard>();
    // public PrayerRequestDashboardDataEmitter = new EventEmitter<PrayerRequestDashboard[]>();
    public MobileUserChartDataListEmitter = new EventEmitter<MobileUserChartData>();

    constructor(private httpService: HttpRequestService, private authService: AuthService) {
    }

    public getMainDashboardData() {
        return this.httpService.sendGetRequest('main_dashboard?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetMainDashboardData(data);
                    console.log('users: ', data)
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetMainDashboardData(dash_data) {
        if (dash_data && dash_data.status && dash_data.main_dashboard) {
            this.MainDashboardDataEmitter.emit(dash_data.main_dashboard);
        }
    }

    public getFeedsDashboardData() {
        return this.httpService.sendGetRequest('feeds_dashboard?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetFeedsDashboardData(data);
                    console.log('users: ', data)
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetFeedsDashboardData(dash_data) {
        if (dash_data && dash_data.status && dash_data.feeds_dashboard) {
            this.FeedsDashboardDataEmitter.emit(dash_data.feeds_dashboard);
        }
    }
    public getMemberDashboardData() {
        return this.httpService.sendGetRequest('member_dashboard?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetMembersDashboardData(data);
                    console.log('users: ', data)
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetMembersDashboardData(dash_data) {
        if (dash_data && dash_data.status && dash_data.member_dashboard) {
            this.MemberDashboardDataEmitter.emit(dash_data.member_dashboard);
        }
    }


    public getTeamDashboardData() {
        return this.httpService.sendGetRequest('team_dashboard?team_id=' + this.authService.getSelectedTeam() + '&token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetTeamDashboardData(data);
                    console.log('users: ', data)
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetTeamDashboardData(dash_data) {
        if (dash_data && dash_data.status && dash_data.member_dashboard) {
            this.TeamDashboardDataEmitter.emit(dash_data.member_dashboard);
        }
    }


    public getPrayerRequestDashboardData() {
        return this.httpService.sendGetRequest('prayer_request_dashboard?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPrayerRequestDashboardData(data);
                    console.log('users: ', data)
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetPrayerRequestDashboardData(dash_data) {
        if (dash_data && dash_data.status && dash_data.prayer_dashboard) {
            this.PrayerRequestDashboardDataEmitter.emit(dash_data.prayer_dashboard);
        }
    }

    public getPartnerDashboardData() {
        return this.httpService.sendGetRequest('partnership_dashboard?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetPartnersDashboardData(data);
                    console.log('users: ', data)
                },
                error => {
                    console.log(error);
                },
            );
    }

    private processGetPartnersDashboardData(dash_data) {
        if (dash_data && dash_data.status && dash_data.partner_dashboard) {
            this.PartnerDashboardDataEmitter.emit(dash_data.partner_dashboard);
        }
    }

    public getDailyUsersDashboardData(num: number) {
        this.httpService.sendGetRequest('daily_member_usage_chart/' + num + '?token=' + this.authService.getUserToken())
            .subscribe(
                data => {
                    this.processGetMobileUserChartData(data);
                    console.log(data);
                },
                error => {
                    console.log('ERROR', error)
                }
            );
    }

    public processGetMobileUserChartData(mobile_user_data: any) {
        if (mobile_user_data && mobile_user_data.status && mobile_user_data.users_member_data) {
            this.DashboardUsersDailyDataEmitter.emit(mobile_user_data.users_member_data);
        }
    }
}
