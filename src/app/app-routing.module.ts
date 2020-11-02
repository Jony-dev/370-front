import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login/login.component';
import { ForgotPasswordComponent } from './components/forgotPassword/forgot-password/forgot-password.component';
import { CreateAccountComponent } from './components/profile/createAccount/create-account/create-account.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { ResetPasswordComponent } from './components/resetPassword/reset-password/reset-password.component';
import { AccountSuccessCreateComponent } from './components/accountSuccess/account-success-create/account-success-create.component';
import { BuildingComponent } from './components/config/building/building/building.component'
import { CompanyConfigComponent } from './components/config/company/company-config/company-config.component';
import { TableComponent } from './components/config/table/table/table.component';
import { ConfigJobCardComponent } from './components/config/jobCard/config-job-card/config-job-card.component';
import { ConfigRolesAndAuthComponent } from './components/config/rolesAndAuth/config-roles-and-auth/config-roles-and-auth.component';
import { ConfigskillsAndQsComponent } from './components/config/skillsAndQs/configskills-and-qs/configskills-and-qs.component';
import { LogComponent } from './components/audit/log/log/log.component';
import { AuthorizationComponent } from './components/audit/authorization/authorization/authorization.component';
import { DatabaseComponent } from './components/audit/database/database/database.component';
import { HireRequestComponent } from './components/hireRequest/hire-request/hire-request.component';
import { TeamComponent } from './components/team/teamView/team/team.component';
import { InterviewComponent } from './components/interview/interview/interview.component';
import { HiringControlComponent } from './components/hr/HiringControl/hiring-control/hiring-control.component';
import { JobCardDashComponent } from './components/hr/jobCard/job-card-dash/job-card-dash.component';
import { FullJobCardComponent } from './components/hr/jobCard/full-job-card/full-job-card.component';
import { CreateEmployeeComponent } from './components/hr/createEmployee/create-employee/create-employee.component';
import { UpdateEmployeeComponent } from './components/hr/updateEmployee/update-employee/update-employee.component';
import { SearchEmployeeComponent } from './components/searchEmployee/search-employee/search-employee.component';
import { JobListingComponent } from './components/jobListing/job-listing/job-listing.component';
import { ApproveJobCardComponent } from './components/ApproveJobCard/approve-job-card/approve-job-card.component';
import { JobApplicationViewComponent } from './components/jobListing/job-application-view/job-application-view.component';
import { BookingComponent } from './components/booking/booking/booking.component';
import { AuthGuardService } from './services/auth-guard.service';
import { InterviewReportComponent } from './components/reports/interview-report/interview-report.component';
import { StageReportComponent } from './components/reports/stage-report/stage-report.component';
import { TeamReportComponent } from './components/reports/team-report/team-report.component';
import { CandidateReportComponent } from './components/reports/candidate-report/candidate-report.component';
import { BookingReportComponent } from './components/reports/booking-report/booking-report.component';
import { AssistBookingComponent } from './components/booking/assist-booking/assist-booking.component';
import { BackupRestoreComponent } from './components/config/backup-restore/backup-restore.component';
import { HomeComponent } from './components/home/home/home.component';
import { UserManualComponent } from './components/user-manual/user-manual.component';
import { UserAccountComponent } from './components/searchEmployee/user-account/user-account.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

const routes: Routes = [
{ path: "", component : LoginComponent},
{ path: "ForgotPassword", component : ForgotPasswordComponent},
{ path: "CreateAccount", component : CreateAccountComponent},
{ path: "Dashboard", component : DashboardComponent, canActivate :[AuthGuardService],
  children : [
      { path : "ConfigBuilding", component : BuildingComponent},
      { path : "ConfigCompany", component : CompanyConfigComponent},
      { path : "ConfigJobCard", component : ConfigJobCardComponent},
      { path : "ConfigRolesAndAuthorization", component : ConfigRolesAndAuthComponent},
      { path : "ConfigTable", component : TableComponent},
      { path : "ConfigSkillsAndQuestions", component : ConfigskillsAndQsComponent},
      { path : "AuditLog", component : LogComponent},
      { path : "AuditAuthorization", component : AuthorizationComponent},
      { path : "AuditDatabase", component : DatabaseComponent},
      { path : "HireRequest", component : HireRequestComponent},
      { path : "Teams", component : TeamComponent},
      { path : "Interviews", component : InterviewComponent},
      { path : "HireManagerControl", component : HiringControlComponent},
      { path : "JobCardDashboard", component : JobCardDashComponent},
      { path : "FullJobCard/:id", component : FullJobCardComponent},
      { path : "CreateEmployee/:id", component : CreateEmployeeComponent},
      { path : "UpdateEmployee/:id", component : UpdateEmployeeComponent},
      { path : "SearchEmployee", component : SearchEmployeeComponent},
      { path : "JobListing", component : JobListingComponent},
      { path : "JobCardApproval", component : ApproveJobCardComponent},
      { path : "JobView/:id", component : JobApplicationViewComponent},
      { path : "Booking", component : BookingComponent},
      { path : "InterviewReport", component : InterviewReportComponent},
      { path : "StageReport", component : StageReportComponent},
      { path : "TeamReport", component : TeamReportComponent},
      { path : "CandidateReport", component : CandidateReportComponent},
      { path : "BookingReport", component : BookingReportComponent,},
      { path : "AssistBooking", component : AssistBookingComponent,},
      { path : "backupRestore", component : BackupRestoreComponent,},
      { path : "Home", component : HomeComponent,},
      { path : "UserProfile/:id", component : UserAccountComponent,},
      { path : "UserManual", component : UserManualComponent,},
  ]},
{ path: "AccountCreated", component : AccountSuccessCreateComponent},
{ path: "About-Us", component : AboutUsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
