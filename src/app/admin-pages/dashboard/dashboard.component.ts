import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardService} from '../services/dashboard.service';
import {ChartObject, DashboardListData, MainDashboard} from './dashboard.objects';
import * as Chartist from 'chartist';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
    public main_dashboard_data = new MainDashboard();
    public bar_chart_chart_object: ChartObject = new ChartObject();
    public bar_chart: any = null;
    public bar_chart_option: any = null;
    public dataRefresher: any;
    public current_dashboard_date_ref = 0;
    public loading = false;
    public dashboard_data = new DashboardListData();
    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.updateDashboardComponent();
        this.bar_chart_chart_object = new ChartObject();
        this.dashboardService.MainDashboardDataEmitter.subscribe(
            data => {
                this.main_dashboard_data = data; console.log('Main dashboard', data);
            }
        );
        this.dashboardService.DashboardUsersDailyDataEmitter.subscribe(
            data => {this.dashboard_data = data; this.updateChartData(); this.loading = false; console.log('daly_users', data); }
        );
        this.bar_chart_option = {
            high: 100,
            low: 0,
            scaleMinSpace: 20,
            seriesBarDistance: 10,
            onlyInteger: true,
            showArea: true,
            fullWidth: true,
            showLabel: true,
            axisX: {
                showLabel: true,
                showGrid: true
            },
            referenceValue: 5
        };
        // this.bar_chart = new Chartist.Bar('#bar_chart', this.bar_chart_chart_object, this.bar_chart_option);
        this.refreshData();
    }
    public updateDashboardComponent() {
        this.dashboardService.getDailyUsersDashboardData(this.current_dashboard_date_ref);
        this.dashboardService.getMainDashboardData();
    }
    public updateChartData() {
        console.log('update CHART', this.dashboard_data);
        this.bar_chart_chart_object.series = [this.dashboard_data.users_count];
        this.bar_chart_chart_object.labels = this.dashboard_data.member_date;
        this.bar_chart_option.high = Math.max.apply(Math, this.dashboard_data.users_count);
        this.bar_chart = new Chartist.Bar('#bar_chart', this.bar_chart_chart_object, this.bar_chart_option);
    }
    public refreshData() {
        this.dataRefresher =
            setInterval(() => {
                this.bar_chart = new Chartist.Bar('#bar_chart', this.bar_chart_chart_object, this.bar_chart_option);
            }, 3000);
    }
    public cancelPageRefresh() {
        if (this.dataRefresher) {
            clearInterval(this.dataRefresher);
        }
    }

    ngOnDestroy(): void {
        this.cancelPageRefresh();
    }
    public moveDashboardData(day_ref: number) {
        this.loading = true;
        this.current_dashboard_date_ref = this.current_dashboard_date_ref + day_ref;
        this.dashboardService.getDailyUsersDashboardData(this.current_dashboard_date_ref);
    }
}
