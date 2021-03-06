import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//Boostrap
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './components/profile/createAccount/create-account/create-account.component';
import { AccountSuccessCreateComponent } from './components/accountSuccess/account-success-create/account-success-create.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TestModalComponent } from './components/test-modal/test-modal.component';
import { ToastComponent } from './components/system/toast/toast.component';
import { ToastsService } from './services/toasts.service';
import { EditProfileMComponent } from './components/modals/editProfile/edit-profile-m/edit-profile-m.component';
import { ProfileCardComponent } from './components/profile/profileCard/profile-card/profile-card.component';
import { SkillComponent } from './components/profile/skills/skill/skill.component';
import { LanguageComponent } from './components/profile/languages/language/language.component';
import { UploadImageComponent } from './components/modals/uploadImage/upload-image/upload-image.component';
import { ProfileAddSkillComponent } from './components/modals/profileAddSkill/profile-add-skill/profile-add-skill.component';
import { ProfileAddLanguageComponent } from './components/modals/profileAddLanguage/profile-add-language/profile-add-language.component';
import { CompanyConfigComponent } from './components/config/company/company-config/company-config.component';
import { BuildingComponent } from './components/config/building/building/building.component';
import { TableComponent } from './components/config/table/table/table.component';
import { ConfigJobCardComponent } from './components/config/jobCard/config-job-card/config-job-card.component';
import { ConfigRolesAndAuthComponent } from './components/config/rolesAndAuth/config-roles-and-auth/config-roles-and-auth.component';
import { ConfigskillsAndQsComponent } from './components/config/skillsAndQs/configskills-and-qs/configskills-and-qs.component';
import { LogComponent } from './components/audit/log/log/log.component';
import { DatabaseComponent } from './components/audit/database/database/database.component';
import { AuthorizationComponent } from './components/audit/authorization/authorization/authorization.component';
import { HireRequestComponent } from './components/hireRequest/hire-request/hire-request.component';
import { RequestCardComponent } from './components/hireRequest/requestCard/request-card/request-card.component';
import { TeamComponent } from './components/team/teamView/team/team.component';
import { TeamCardComponent } from './components/team/teamCard/team-card/team-card.component';
import { InterviewComponent } from './components/interview/interview/interview.component';
import { InterviewRecordComponent } from './components/interview/interviewRecord/interview-record/interview-record.component';
import { HiringControlComponent } from './components/hr/HiringControl/hiring-control/hiring-control.component';
import { ApprovalCardComponent } from './components/hr/helperComponents/approval-card/approval-card.component';
import { GenerateJobCardComponent } from './components/hr/modals/generate-job-card/generate-job-card.component';
import { JobRequestDetailsComponent } from './components/hr/helperComponents/job-request-details/job-request-details.component';
import { RejectRequestComponent } from './components/hr/modals/reject-request/reject-request.component';
import { JobCardDashComponent } from './components/hr/jobCard/job-card-dash/job-card-dash.component';
import { AssignedCardComponent } from './components/hr/helperComponents/assigned-card/assigned-card.component';
import { JobCardCreateComponent } from './components/hr/jobCard/job-card-create/job-card-create.component';
import { FullJobCardComponent } from './components/hr/jobCard/full-job-card/full-job-card.component';
import { ApplicantPoolCardComponent } from './components/hr/helperComponents/applicant-pool-card/applicant-pool-card.component';
import { CreateInterviewComponent } from './components/hr/modals/create-interview/create-interview.component';
import { InterviewCommentComponent } from './components/hr/helperComponents/interview-comment/interview-comment.component';
import { InterviewOverviewComponent } from './components/hr/modals/interview-overview/interview-overview.component';
import { JobInformationComponent } from './components/hr/jobCard/job-information/job-information.component';
import { ApproverCardComponent } from './components/hr/helperComponents/approver-card/approver-card.component';
import { CreateEmployeeComponent } from './components/hr/createEmployee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/hr/updateEmployee/update-employee/update-employee.component';
import { SearchEmployeeComponent } from './components/searchEmployee/search-employee/search-employee.component';
import { JobListingComponent } from './components/jobListing/job-listing/job-listing.component';
import { ApproveJobCardComponent } from './components/ApproveJobCard/approve-job-card/approve-job-card.component';
import { RolePickerComponent } from './components/hr/helperComponents/role-picker/role-picker.component';
import { RoleAdderComponent } from './components/hr/modals/role-adder/role-adder.component';
import { JobListingCardComponent } from './components/jobListing/helperComponents/job-listing-card/job-listing-card.component';
import { JobApplicationViewComponent } from './components/jobListing/job-application-view/job-application-view.component';
import { JobApplicationComponent } from './components/jobListing/jobApplication/job-application/job-application.component';
import { MyApplicationsComponent } from './components/jobListing/helperComponents/my-applications/my-applications.component';
import { NotificationComponent } from './components/notifications/notification/notification.component';
import { EditAddStageComponent } from './components/config/modals/edit-add-stage/edit-add-stage.component';
import { EditAddTestComponent } from './components/config/modals/edit-add-test/edit-add-test.component';
import { EditTableComponent } from './components/config/modals/edit-table/edit-table.component';
import { EditAddLocationComponent } from './components/config/modals/edit-add-location/edit-add-location.component';
import { EditAddBuildingComponent } from './components/config/modals/edit-add-building/edit-add-building.component';
import { EditAddFloorComponent } from './components/config/modals/edit-add-floor/edit-add-floor.component';
import { EditAddDepartmentComponent } from './components/config/modals/edit-add-department/edit-add-department.component';
import { EditAddDivisionComponent } from './components/config/modals/edit-add-division/edit-add-division.component';
import { EditAddSkillComponent } from './components/config/modals/edit-add-skill/edit-add-skill.component';
import { EditAddRequirementComponent } from './components/config/modals/edit-add-requirement/edit-add-requirement.component';
import { EditAddQuestionComponent } from './components/config/modals/edit-add-question/edit-add-question.component';
import { EditAddRoleComponent } from './components/config/modals/edit-add-role/edit-add-role.component';
import { EditAddJobComponent } from './components/config/modals/edit-add-job/edit-add-job.component';
import { EditAddViewAuthorizationComponent } from './components/config/modals/edit-add-view-authorization/edit-add-view-authorization.component';
import { PendingSkillComponent } from './components/config/modals/pending-skill/pending-skill.component';
import { PendingRequirementComponent } from './components/config/modals/pending-requirement/pending-requirement.component';
import { PendingQuestionComponent } from './components/config/modals/pending-question/pending-question.component';
import { CalendarComponent } from './components/booking/helperComponent/calendar/calendar.component';
import { EditAddTeamComponent } from './components/team/modals/edit-add-team/edit-add-team.component';
import { AddTeamMemberComponent } from './components/team/modals/add-team-member/add-team-member.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { AddEditDeskBookingComponent } from './components/booking/modals/add-edit-desk-booking/add-edit-desk-booking.component';
import { AddEditSlotBookingComponent } from './components/booking/modals/add-edit-slot-booking/add-edit-slot-booking.component';
import { ViewApplicationComponent } from './components/hr/modals/view-application/view-application.component';
import { InterceptorService } from './services/interceptor.service';
import { ResetPasswordComponent } from './components/modals/reset-password/reset-password.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations"
import { JobCardHelperService } from './services/job-card-helper.service';
import { FilterName } from './components/system/pipes/filterName.pipe';
import { RejectCardComponent } from './components/ApproveJobCard/modals/reject-card/reject-card.component';
import { StageReportComponent } from './components/reports/stage-report/stage-report.component';
import { InterviewReportComponent } from './components/reports/interview-report/interview-report.component';
import { TeamReportComponent } from './components/reports/team-report/team-report.component';
import { CandidateReportComponent } from './components/reports/candidate-report/candidate-report.component';
import { BookingReportComponent } from './components/reports/booking-report/booking-report.component';
import { AssistBookingComponent } from './components/booking/assist-booking/assist-booking.component';
import { FilterStage } from './components/system/pipes/stageFilter.pipe';
import { FilterTest } from './components/system/pipes/filterTest.pipe';
import { FilterBuilding } from './components/system/pipes/filterBuilding.pipe';
import { FilterFloor } from './components/system/pipes/filterFloor.pipe';
import { FilterLocation } from './components/system/pipes/filterLocation.pipe';
import { FilterDepartment } from './components/system/pipes/filterDepartment.pipe';
import { FilterDivision } from './components/system/pipes/filterDivision.pipe';
import { FilterSkills } from './components/system/pipes/filterSkills.pipe';
import { FilterRequirements } from './components/system/pipes/filterRequirements.pipe';
import { FilterQuestions } from './components/system/pipes/filterQuestions.pipe';
import { FilterRoles } from './components/system/pipes/filterRoles.pipe';
import { FilterJobs } from './components/system/pipes/filterJobs.pipe';
import { FilterViewAuth } from './components/system/pipes/filterViewAuths.pipe';
import { FilterMyListings } from './components/system/pipes/filterJobListing.pipe';
import { BackupRestoreComponent } from './components/config/backup-restore/backup-restore.component';
import { FilterApplicants } from './components/system/pipes/filterPool.pipe';
import { HomeComponent } from './components/home/home/home.component';
import { FilterOperationAuth } from './components/system/pipes/filterOperationAuth.pipe';
import { FilterFloorDrop } from './components/system/pipes/filterFloorDrop.pipe';
import { FilterLanguages } from './components/system/pipes/filterLanguages.pipe';
import { FilterBetweenDates } from './components/system/pipes/filterBetweenDates.pipe';
import { UserManualComponent } from './components/user-manual/user-manual.component';
import { FilterAudit } from './components/system/pipes/filterAudit.pipe';
import { FilterTables } from './components/system/pipes/filterTables.pipe';
import { FilterDepartmentMembers } from './components/system/pipes/filterDepartmentMembers.pipe';
import { FilterSearchUser } from './components/system/pipes/filterSearchUser.pipe';
import { UserAccountComponent } from './components/searchEmployee/user-account/user-account.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    CreateAccountComponent,
    AccountSuccessCreateComponent,
    TestModalComponent,
    ToastComponent,
    EditProfileMComponent,
    ProfileCardComponent,
    SkillComponent,
    LanguageComponent,
    UploadImageComponent,
    ProfileAddSkillComponent,
    ProfileAddLanguageComponent,
    CompanyConfigComponent,
    BuildingComponent,
    TableComponent,
    ConfigJobCardComponent,
    ConfigRolesAndAuthComponent,
    ConfigskillsAndQsComponent,
    LogComponent,
    DatabaseComponent,
    AuthorizationComponent,
    HireRequestComponent,
    RequestCardComponent,
    TeamComponent,
    TeamCardComponent,
    InterviewComponent,
    InterviewRecordComponent,
    HiringControlComponent,
    ApprovalCardComponent,
    GenerateJobCardComponent,
    JobRequestDetailsComponent,
    RejectRequestComponent,
    JobCardDashComponent,
    AssignedCardComponent,
    JobCardCreateComponent,
    FullJobCardComponent,
    ApplicantPoolCardComponent,
    CreateInterviewComponent,
    InterviewCommentComponent,
    InterviewOverviewComponent,
    JobInformationComponent,
    ApproverCardComponent,
    CreateEmployeeComponent,
    UpdateEmployeeComponent,
    SearchEmployeeComponent,
    JobListingComponent,
    ApproveJobCardComponent,
    RolePickerComponent,
    RoleAdderComponent,
    JobListingCardComponent,
    JobApplicationViewComponent,
    JobApplicationComponent,
    MyApplicationsComponent,
    NotificationComponent,
    EditAddStageComponent,
    EditAddTestComponent,
    EditTableComponent,
    EditAddLocationComponent,
    EditAddBuildingComponent,
    EditAddFloorComponent,
    EditAddDepartmentComponent,
    EditAddDivisionComponent,
    EditAddSkillComponent,
    EditAddRequirementComponent,
    EditAddQuestionComponent,
    EditAddRoleComponent,
    EditAddJobComponent,
    EditAddViewAuthorizationComponent,
    PendingSkillComponent,
    PendingRequirementComponent,
    PendingQuestionComponent,
    CalendarComponent,
    EditAddTeamComponent,
    AddTeamMemberComponent,
    BookingComponent,
    AddEditDeskBookingComponent,
    AddEditSlotBookingComponent,
    ViewApplicationComponent,
    ResetPasswordComponent,
    ResetPasswordComponent,
    RejectCardComponent,
    FilterName,
    FilterStage,
    FilterTest,
    FilterBuilding,
    FilterFloor,
    FilterLocation,
    FilterDepartment,
    FilterDivision,
    FilterSkills,
    FilterRequirements,
    FilterQuestions,
    FilterRoles,
    FilterJobs,
    FilterViewAuth,
    FilterMyListings,
    FilterMyListings,
    FilterOperationAuth,
    FilterBetweenDates,
    FilterLanguages,
    AssistBookingComponent,
    FilterApplicants,
    FilterFloorDrop,
    FilterAudit,
    FilterTables,
    FilterDepartmentMembers,
    FilterSearchUser,
    BackupRestoreComponent,
    HomeComponent,
    UserManualComponent,
    StageReportComponent,
    InterviewReportComponent,
    TeamReportComponent,
    CandidateReportComponent,
    BookingReportComponent,
    AssistBookingComponent,
    UserAccountComponent,
    AboutUsComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule,
    TooltipModule,
    ModalModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,



  ],
  providers: [
    FormBuilder,
    ToastsService,
    JobCardHelperService,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}


  ],
  bootstrap: [AppComponent],
  entryComponents: [ TestModalComponent ]
})
export class AppModule { }
