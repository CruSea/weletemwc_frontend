import {DashboardComponent} from './dashboard/dashboard.component';
import {Routes} from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {SettingsComponent} from "./settings/settings.component";
import {MembersComponent} from "./members/members.component";
import {PartnershipComponent} from "./partnership/partnership.component";
import {PublicUsersComponent} from "./public-users/public-users.component";
import {AuthGuard} from "../services/auth.guard";
import {TeamsComponent} from "./teams/teams.component";
import {TeamDetailComponent} from "./teams/team-detail/team-detail.component";
import {TeamCategoriesComponent} from "./teams/team-categories/team-categories.component";

export const AdminPagesRouting: Routes = [
  { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'public-users',  component: PublicUsersComponent, canActivate: [AuthGuard]},
  { path: 'members',      component: MembersComponent,   canActivate: [AuthGuard]},
  { path: 'teams',      component: TeamsComponent,   canActivate: [AuthGuard]},
  { path: 'team/members',      component: TeamDetailComponent,   canActivate: [AuthGuard]},
  { path: 'team/categories',      component: TeamCategoriesComponent,   canActivate: [AuthGuard]},
  { path: 'partnership',      component: PartnershipComponent, canActivate: [AuthGuard]},
  { path: 'settings',      component: SettingsComponent, canActivate: [AuthGuard]},
  { path: 'users',      component: UsersComponent, canActivate: [AuthGuard]},
];
