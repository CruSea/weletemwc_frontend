import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'ዳሽቦርድ',  icon: 'dashboard', class: '' },
    // { path: '/admin/news-feeds', title: 'NewsFeeds',  icon: 'rss_feed', class: '' },
    // { path: '/admin/playlist', title: 'Playlist',  icon: 'slow_motion_video', class: '' },
    // { path: '/admin/prayer-request', title: 'PrayerRequest',  icon: 'phone', class: '' },
    // { path: '/admin/public-users', title: 'Public Users',  icon: 'supervisor_account', class: '' },
    { path: '/admin/members', title: 'አባላት',  icon: 'supervisor_account', class: '' },
    { path: '/admin/teams', title: 'ቡድኖች',  icon: 'slow_motion_video', class: '' },
    // { path: '/admin/playlist', title: 'Playlist',  icon: 'slow_motion_video', class: '' },
    { path: '/admin/users', title: 'ተጠቃሚዎች',  icon: 'person', class: '' },
    // { path: '/admin/donation', title: 'Donation',  icon: 'money', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  public logOut() {
      this.authService.logOut();
  }
}
