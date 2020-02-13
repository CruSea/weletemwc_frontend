import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {ComponentsModule} from '../components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatRippleModule,
    MatSelectModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule,
    MatToolbarModule, MatTabsModule, MatExpansionModule, MatStepperModule, MatPaginatorModule, MatRadioModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {NgxLoadingModule} from 'ngx-loading';
import {AlertModule, BsDatepickerModule, ModalModule, PaginationModule, TooltipModule} from 'ngx-bootstrap';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {AdminPagesRouting} from './admin-pages-routing';
import { SettingsComponent } from './settings/settings.component';
import { UsersComponent } from './users/users.component';
import {UsersService} from './services/users.service';
import {DashboardService} from './services/dashboard.service';
import { NewUserDialogComponent } from './users/new-user-dialog/new-user-dialog.component';
import { UpdateUserDialogComponent } from './users/update-user-dialog/update-user-dialog.component';
import { MembersComponent } from './members/members.component';
import { NewMemberDialogComponent } from './members/new-member-dialog/new-member-dialog.component';
import { EditMemberDialogComponent } from './members/edit-member/edit-member-dialog.component';
import {PartnershipComponent } from './partnership/partnership.component';
import { PublicUsersComponent } from './public-users/public-users.component';
import {ViewMemberInfoComponent } from './members/view-member-info/view-member-info.component';
import { ViewPartnershipRequestComponent } from './partnership/view-partnership-request/view-partnership-request.component';
import { NewPartnerDialogComponent } from './partnership/new-partner-dialog/new-partner-dialog.component';
import { EditPartnershipInfoComponent } from './partnership/edit-partnership-info/edit-partnership-info.component';
import { ViewUserInfoComponent } from './public-users/view-user-info/view-user-info.component';
import { TeamsComponent } from './teams/teams.component';
import { NewTeamComponent } from './teams/new-team/new-team.component';
import { EditTeamComponent } from './teams/edit-team/edit-team.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { TeamLeadersComponent } from './teams/team-detail/team-leaders/team-leaders.component';
import {TeamService} from "./services/team-service";
import { EditTeamLeadersComponent } from './teams/team-detail/edit-team-leaders/edit-team-leaders.component';
import { NewTeamLeadersComponent } from './teams/team-detail/new-team-leaders/new-team-leaders.component';
import { AvatarModule } from 'ngx-avatar';
import {MatTableModule} from '@angular/material/table';
import { EditTeamMemberComponent } from './teams/team-detail/edit-team-member/edit-team-member.component';
import { NewTeamMembersComponent } from './teams/team-detail/new-team-members/new-team-members.component';
import { TeamCategoriesComponent } from './teams/team-categories/team-categories.component';
import { NewTeamCategoryComponent } from './teams/team-categories/new-team-category/new-team-category.component';
import { NewMemberChildComponent } from './members/edit-member/new-member-child/new-member-child.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminPagesRouting),
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule,
    MatToolbarModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTabsModule,
    MatRadioModule,
    MatExpansionModule,
    MatStepperModule,
      MatTableModule,
    AngularFontAwesomeModule,
    NgxLoadingModule.forRoot({}),
    AlertModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PaginationModule.forRoot(),
    BsDatepickerModule.forRoot(),
      AvatarModule

  ],
  declarations: [DashboardComponent, SettingsComponent, UsersComponent,
    NewUserDialogComponent,
    UpdateUserDialogComponent,
    MembersComponent,
    NewMemberDialogComponent,
    EditMemberDialogComponent,
    PartnershipComponent,
    PublicUsersComponent,
    ViewMemberInfoComponent,
    ViewPartnershipRequestComponent,
    NewPartnerDialogComponent,
    EditPartnershipInfoComponent,
    ViewUserInfoComponent,
    TeamsComponent,
    NewTeamComponent,
    EditTeamComponent,
    TeamDetailComponent,
    TeamLeadersComponent,
    EditTeamLeadersComponent,
    NewTeamLeadersComponent,
    EditTeamMemberComponent,
    NewTeamMembersComponent,
    TeamCategoriesComponent,
    NewTeamCategoryComponent,
    NewMemberChildComponent,
    ],
  providers: [UsersService, DashboardService, TeamService],
  entryComponents: [NewUserDialogComponent,
    UpdateUserDialogComponent,
      NewMemberDialogComponent,
      EditMemberDialogComponent ,
      ViewMemberInfoComponent ,
      ViewPartnershipRequestComponent ,
      NewPartnerDialogComponent,
      EditPartnershipInfoComponent,
      ViewUserInfoComponent,
      NewTeamComponent,
      EditTeamComponent,
      EditTeamLeadersComponent,
      NewTeamLeadersComponent,
      EditTeamMemberComponent,
      NewTeamMembersComponent,
      TeamCategoriesComponent,
      NewTeamCategoryComponent,
      NewMemberChildComponent,
  ]

})
export class AdminPagesModule { }
