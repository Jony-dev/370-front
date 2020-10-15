import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Country } from '../models/country';
import { Nationality } from '../models/Nationality';
import { ToastsService } from './toasts.service';
import { userCard } from '../models/userCard';
import { User } from '../models/user';
import { UserProfile } from '../models/userProfile';
import { Job } from '../models/job';
import { Justification } from '../models/justification';
import { Role } from '../models/role';
import { Stage } from '../models/stage';
import { ViewAuth } from '../models/viewAuth';
import { View } from '../models/view';
import { JobReqCard } from '../models/jobReqCard';
import { Requirement } from '../models/requirement';
import { LongQuestion } from '../models/longQuestion';
import { JobRequestInfo } from '../models/jobReqDetails';
import { HiringTeam } from '../models/hiringTeam';
import { Division } from '../models/division';
import { Department } from '../models/department';
import { Team } from '../models/team';
import { Test } from '../models/test';
import { Location } from '../models/location';
import { Building } from '../models/building';
import { Floor } from '../models/floor';
import { Schedule } from '../models/schedule';
import { RequisitionApproval } from '../models/requisitionApproval';
import { Language } from '../models/language';
import { Tafel } from '../models/tafel';
import { TableType } from '../models/tableType';
import { OperationAuthorisation } from '../models/operationAuthorization';
import { MyWorkingCards } from '../models/myWorkingCards';
import { JobCardInfo } from '../models/jobCardInfo';
import { MyApprovers } from '../models/myApprovers';
import { UserApprover } from '../models/userApprover';
import { EditJobCard } from '../models/editJobCard';
import { MyListings } from '../models/myListings';
import { DatabaseTable } from '../models/databaseTable';
import { Operation } from '../models/operation';
import { ApplicationQuestions } from '../models/applicationQuestions';
import { MyApplication } from '../models/myApplication';
import { ApplicantPoolCard } from '../models/applicantPool';
import { UpCommingInterviews } from '../models/upComingInterviews';
import { ScheduledInterview } from '../models/scheduledInterview';
import { PassedInterview } from '../models/passedInterview';
import { CardStatus } from '../models/cardStatus';
import { CreateEmployee } from '../models/createEmployee';
import { EditInterview } from '../models/editInterview';
import { BookableDate } from '../models/bookableDate';
import { BookingCap } from '../models/bookingCap';
import { GroupBookingCap } from '../models/groupBookingCap';
import { SlotTable } from '../models/slotTable';
import { Audit } from '../models/audit';
import { HomeCard } from '../models/homeCard';





@Injectable({
  providedIn: 'root'
})
export class ApiService {

  /*****************URLS********************/
  globalRoot :string = 'https://bmwbackend.edumarx.co.za/'
  user : string = `${this.globalRoot}API/User/`;
  country : string = `${this.globalRoot}API/Country/`;
  nationality : string = `${this.globalRoot}API/Nationality/`;
  jobRequest : string = `${this.globalRoot}API/JobRequest/`;
  justification : string = `${this.globalRoot}API/Justification/`;
  jobPositions : string = `${this.globalRoot}API/Job/`;
  booking : string = `${this.globalRoot}API/UserBooking/`;
  role : string = `${this.globalRoot}API/Role/`;
  job : string = `${this.globalRoot}API/Job/`;
  viewAuth : string = `${this.globalRoot}API/ViewAuthorisation/`;
  view : string = `${this.globalRoot}API/View/`;
  skill : string = `${this.globalRoot}API/Skill/`;
  requirement : string = `${this.globalRoot}API/Requirement/`;
  longQuestion : string = `${this.globalRoot}API/LongQuestion/`;
  userRole : string = `${this.globalRoot}API/UserRole/`;
  jobCard : string = `${this.globalRoot}API/JobCard/`;
  department : string = `${this.globalRoot}API/Department/`;
  division : string = `${this.globalRoot}API/Division/`;
  team : string = `${this.globalRoot}API/Team/`;
  stage : string = `${this.globalRoot}API/Stage/`;
  test : string = `${this.globalRoot}API/Test/`;
  location : string = `${this.globalRoot}API/Location/`;
  building : string = `${this.globalRoot}API/Building/`;
  floor : string = `${this.globalRoot}API/Floor/`;
  schedule : string = `${this.globalRoot}API/Schedule/`;
  requisitionApproval : string = `${this.globalRoot}API/RequisitionApproval/`;
  language : string = `${this.globalRoot}API/Language/`;
  table : string = `${this.globalRoot}API/Tafel/`;
  tableType : string = `${this.globalRoot}API/TableType/`;
  operationAuthorisation : string = `${this.globalRoot}API/OperationAuthorisation/`;
  approver : string = `${this.globalRoot}API/JobCardApprover/`;
  jobListing : string = `${this.globalRoot}API/JobListing/`;
  application : string = `${this.globalRoot}API/Application/`;
  databaseTable : string = `${this.globalRoot}API/DatabaseTable/`;
  operation : string = `${this.globalRoot}API/Operation/`;
  question : string = `${this.globalRoot}API/Question/`;
  answer : string = `${this.globalRoot}API/Answer/`;
  interview: string = `${this.globalRoot}API/Interview/`;
  date : string = `${this.globalRoot}API/Date`;
  backUp : string = `${this.globalRoot}API/Backup`;
  audit: string = `${this.globalRoot}API/Audit/`;



  constructor( private http: HttpClient){ }

  makeRequest(){

    this.http.post<string>(this.country,{"request":"test","payload":0},{headers:{'Authorization':'Bearer '+'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIyNjUyLCJyb2xlcyI6W3siaWQiOjAsInJvbGUiOiJNYW5hZ2VyIn0seyJpZCI6MSwicm9sZSI6IkVtcGxveWVlIn1dLCJ2aWV3cyI6W3siaWQiOjAsInZpZXciOiJSZXBvcnQifSx7ImlkIjoxLCJyb2xlIjoiQm9va2luZyJ9XSwiZW5kU2Vzc2lvbiI6MTU5NjUzOTgzMX0.76phXVqFCK60VdOrtAEhGne-09MdRHie3kJnUbBgmbw'}})
    .subscribe( success => console.log(success),
    error => console.log("ERROR",error));
  }

  getCountries(){
    return this.http.post<Country[]>(this.country,{request:"getCountries"});
  }

  getNationalities(){
    return this.http.post<Nationality[]>(this.nationality,{request:"getNationalities"});
  }

  createAccount(userDetails:any){
    return this.http.post(this.user,{request:"createAccount",payload: userDetails});
  }

  getUserProfileLite(userId: number){
    return this.http.post<userCard>(this.user,{request:"getWidgetDetails",payload:{id:userId}});
  }

  getUsersOwnProfile(){
    return this.http.post<UserProfile>(this.user,{request:"getUserProfile"});
  }

  createJobRequest(request : any){
    console.log()
    return this.http.post(this.jobRequest,{request:"createJobRequest",payload:request});
  }

  editAccount(userInfo: any){
    return this.http.post<any>(this.user,{request : "updateAccount",payload: userInfo});
  }

  uploadProfile(file : File){

    let uploadData : FormData = new FormData();
    uploadData.append('request','changeProfileImage');
    uploadData.append('image',file);
    return this.http.post(this.user,uploadData);
  }
  changePassword(password : string){
    return this.http.post(this.user,{request : "changePassword", payload : {password : password}})
  }

  getJustifications(){
    return this.http.post<Justification[]>(this.justification,{request: "getJustifications" });
  }
  ///////////////////////////////////////role/////////////////////////////////////
  addRole(role:any){
    return this.http.post(this.role,{request :"createRole",payload : role})
  }
  editRole( role : any){
    return this.http.post(this.role,{request :"updateRole",payload : role});
  }
  getRoles(){
    return this.http.post<Role[]>(this.role,{request : "getRoles"});
  }
  deleteRole(id : number){
    return this.http.post(this.role, {request : "deleteRole", payload : {id}});
  }
  ///////////////////////////////////////stage///////////////////////////
  addStage(stage:any){
    return this.http.post(this.stage,{request :"createStage",payload : stage})
  }
  editStage( stage : any){
    return this.http.post(this.stage,{request :"updateStage",payload : stage});
  }
  getStages(){
    return this.http.post<Stage[]>(this.stage,{request : "getStages"});
  }

 deleteStage(id : number){
    return this.http.post(this.stage, {request : "deleteStage", payload : {id}});
  }
  /////////////////////////////////////test////////////////////
  addTest(test: any){

    return this.http.post(this.test,{request :"createTest",payload : test})
  }

  editTest( test : any){
    return this.http.post(this.test,{request :"updateTest",payload : test});
  }

  getTests(){
    return this.http.post<Test[]>(this.test,{request : "getTests"});
  }


  deleteTest(id : number){
    return this.http.post(this.test, {request : "deleteTest", payload : {id}});
  }
  //////////////////////////////////////Job//////////////////////////////////////
  getJobPositions(){
    return this.http.post<Job[]>(this.jobPositions,{request: "getJobs"})
  }

  getDeletedJobPositions(){
    return this.http.post<Job[]>(this.jobPositions,{request: "getDeletedJobs"})
  }
  editJob(jobName : any){
    return this.http.post(this.job, {request: "updateJob", payload: jobName});
  }
  deleteJob(id : number){
    return this.http.post(this.job, {request: "deleteJob", payload : {id} });
  }
  editJobCard(details : any){
    return this.http.post(this.jobCard, {request: "updateJobCard", payload : details });
  }
  createJob(job : any){
    return this.http.post(this.job, {request: "createJob", payload : job});
  }
  /////////////////////////////  ViewAuth   ////////////////////////////////////////////////////////
  getViewAuths(){
    return this.http.post<ViewAuth>(this.viewAuth, {request : "getViewAuthorisations"});
  }

  createViewAuthorisation(viewAuth : any){
    return this.http.post(this.viewAuth, {request: "createViewAuthorisation", payload : viewAuth});
  }

  // editViewAuths(vId: number, rId :number){
  //   return this.http.post(this.viewAuth, {request: "updateViewAuth", payload:vId, rId });///// need to get 2 variables
  // }

  deleteViewAuthorisation(viewId: number, roleId: number){
    return this.http.post(this.viewAuth,{request : "deleteViewAuthorisation", payload: {viewId, roleId }}); //the name of the function in backend
  }

  ////////////////////////////////  VIEW   ///////////////////////////////////////////

  getViews(){
    return this.http.post<View[]>(this.view, {request: "getViews"});
  }
  getJobRequestCards(){
    return this.http.post<JobReqCard[]>(this.jobRequest,{request : "getManagersRequests"});
  }

  editJobRequest(obj : JobReqCard){
    return this.http.post(this.jobRequest,{request : "updateJobRequest", payload: obj});
  }

  //////////////////////////////////////////   SKILLS   //////////////////////////////////////
  getSkills(){
    return this.http.post(this.skill, {request : "getApprovedSkills"});
  }

  addSkill( skill : any){
    console.log(skill);
    return this.http.post(this.skill,{request : "createSkill", payload: skill});
  }
  editSkill( skill : any){
    return this.http.post(this.skill,{request : "updateSkill", payload: skill});
  }
  deleteSkill( id : number){
    return this.http.post(this.skill,{request : "deleteSkill", payload: {id}});
  }

  getPendingSkills(){
    return this.http.post(this.skill, {request : "getPendingSkills"});
  }

  approveSkill(id : number){
    return this.http.post(this.skill, {request : "approveSkill", payload : {id}});
  }

  ////////////////////////////////////////////////////////   REQUIREMENT  ////////////////////////////////////////

  getRequirements(){
      return this.http.post(this.requirement, {request : "getApprovedRequirements"});
  }

  addRequirement(requirement : Requirement){
    return this.http.post(this.requirement, {request : "createRequirement", payload : requirement});
  }

  editRequirement(requirement : Requirement){
    return this.http.post(this.requirement, {request : "updateRequirement", payload : requirement});
  }

  deleteRequirement(id : number){
    return this.http.post(this.requirement, {request : "deleteRequirement", payload : {id}});
  }

  getPendingRequirements(){
    return this.http.post(this.requirement, {request : "getPendingRequirements"});
  }

  approveRequirement(id : number){
    return this.http.post(this.requirement, {request : "approveRequirement", payload : {id}});
  }

  ///////////////////////////////////////////////////// LONG QUESTION ////////////////////////////////////
  getLongQuestions(){
    return this.http.post<LongQuestion[]>(this.longQuestion, {request : "getApprovedLongQuestions"});
  }

  addLongQuestions(question : LongQuestion){
    return this.http.post(this.longQuestion, {request : "createLongQuestion", payload : question});
  }

  editLongQuestion( question : LongQuestion){
    return this.http.post(this.longQuestion, {request : "updateLongQuestion", payload : question});
  }

  deleteLongQuestion(id : number){
    return this.http.post(this.longQuestion, {request : "deleteLongQuestion", payload : {id}});
  }
  getPendingLongQuestions(){
    return this.http.post(this.longQuestion, {request : "getPendingLongQuestions"});
  }

  approveLongQuestion(id : number){
    return this.http.post(this.longQuestion, {request : "approveLongQuestion", payload : {id}});
  }

  /////////////////////////////////////////////////////////////////////////////////////////////


  getJobRequests(){
    return this.http.post<JobRequestInfo[]>(this.jobRequest, { request : "getJobRequests"});
  }

  getHiringTeam(){
    return this.http.post<HiringTeam>(this.userRole, { request : "getHiringTeam"});
  }

  rejectRequest(message){
    return this.http.post(this.jobRequest, { request : "rejectJobRequest", payload : message});
  }
  /////////////////////////Location//////////////////////////////////////
  getLocations(){
    return this.http.post<Location[]>(this.location, {request: "getLocations"});
  }

  getDeletedLocations(){
    return this.http.post<Location[]>(this.location, {request: "getDeletedLocations"});
  }

  addLocation(location : any){
    return this.http.post(this.location,{request :"createLocation",payload : location});
  }
  editLocation( location : Location){
    return this.http.post(this.location,{request :"updateLocation",payload :location});
  }
  getLocation(){
    return this.http.post<Role[]>(this.location,{request : "getLocations"});

  }
  deleteLocation(id : number){
    return this.http.post(this.location, {request : "deleteLocation", payload : {id}})
  }

  /////////Building/////////
  addBuilding(building : any){
    return this.http.post(this.building,{request :"createBuilding",payload : building});
  }
  editBuilding( building : Building){
    return this.http.post(this.building,{request :"updateBuilding",payload :building});
  }
  getBuildings(){
    return this.http.post<Building[]>(this.building, {request: "getBuildings"});
  }

  getDeletedBuildings(){
    return this.http.post<Building[]>(this.building, {request: "getDeletedBuildings"});
  }

  deleteBuilding(buildingId : number){
    return this.http.post(this.building, {request: "deleteBuilding", payload : {buildingId}});
  }

  getBuildingsByLocation(locationId: number){
    return this.http.post<Building[]>(this.building, {request: "getBuildingsByLocation", payload: {locationId} }); //move this into the ts
  }

  /////////Floor////////////////////////////
  addFloor(floor : any){
    return this.http.post(this.floor,{request :"createFloor",payload : floor});
  }
  editFloor( floor : Floor){
    return this.http.post(this.floor,{request :"updateFloor",payload :floor});
  }
  getFloors(){
    return this.http.post<Floor[]>(this.floor, {request: "getFloors"});
  }

  deleteFloor(floorId : number){
    return this.http.post(this.floor, {request: "deleteFloor", payload : {floorId}});
  }

  getFloorsByBuilding(buildingId: number){
    return this.http.post<Floor[]>(this.floor, {request: "getFloorsByBuilding", payload: {buildingId}}); //Move this into the ts
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////

  setUpHiringTeam( card : any){
    return this.http.post(this.jobCard, { request : "generateJobCard", payload : card});
  }

  rejectJobRequest( rejection : any){
    return this.http.post(this.jobRequest, { request : "rejectJobRequest"});
  }

  addDepartment(department: any ){
    return this.http.post(this.department,{request :"createDepartment", payload : department});
  }
  addDivision(division: any ){
    return this.http.post(this.division,{request :"createDivision", payload : division});
  }

  editDepartment(department: Department){

    return this.http.post(this.department,{request :"updateDepartment", payload: department });
  }
  editDivision(division: any){

    return this.http.post(this.division,{request :"updateDivision", payload: division });
  }

  getDivisions(){
    return this.http.post<Division[]>(this.division, {request: "getDivisions"});
  }

  getDeletedDivisions(){
    return this.http.post<Division[]>(this.division, {request: "getDeletedDivisions"});
  }

  getDepartments(){
    return this.http.post<Department[]>(this.department, {request: "getDepartments"});
  }

  getTeamsByDepartment(departmentId: number){
    return this.http.post<Team[]>(this.team, {request: "getTeamsByDepartment", payload: {departmentId} });
  }
  getDepartmentsByDivision(divisionId : number){
    return this.http.post<Department[]>(this.department, {request: "getDepartmentsByDivision", payload: {divisionId} });
  }

  deleteDepartment(departmentId: number){
    return this.http.post(this.department, {request : "deleteDepartment", payload : {departmentId}});
  }

  deleteDivision(id: number){
    return this.http.post(this.division, {request : "deleteDivision", payload : {id}});
  }

  getAssignedJobCards(){
    return this.http.post<JobRequestInfo[]>( this.jobRequest, { request : "getAssignedCards"});
  }

  getSchedule(){
    return this.http.post<Schedule[]>( this.schedule, {request : "getSchedules"});
  }

  getRequisitionApprovals(){
    return this.http.post<RequisitionApproval[]>( this.requisitionApproval, { request : "getRequisitionApprovals"});
  }

  getLanguages(){
    return this.http.post<Language[]>( this.language , { request : "getLanguages"});
  }
  ////////////////////////////////////////////////////  table  /////////////////////////
  getTables(){
    return this.http.post<Tafel[]>(this.table, {request: "getTables"});
  }
  addTable(table: any ){
    return this.http.post(this.table,{request :"createTable", payload : table});
  }
  editTable(table: any){
    return this.http.post(this.table,{request :"updateTable", payload: table });
  }
  deleteTable(id: number){
    return this.http.post(this.table, {request : "deleteTable", payload : {id}})
  }

  ///////////////////////////////////////////////////  tableType /////////////////////////////////////////////
  getTableTypes(){
    return this.http.post<TableType[]>(this.tableType, {request: "getTableTypes"});
  }
  ////////////////////////////////////operationauth//////////////////////////////////////////////
  getOperationAuthorisation(){
    return this.http.post<OperationAuthorisation[]>(this.operationAuthorisation, {request : "getOperationAuthorisation"});
  }
  deleteOperationAuthorisation(operationAuthorisation : any){
    return this.http.post(this.operationAuthorisation, {request : "deleteOperationAuthorisation", payload : {operationAuthorisation}})
  }
  createOperationAuthorisation(operationAuthorisation: any ){
    return this.http.post(this.operationAuthorisation,{request :"createOperationAuthorisation", payload : operationAuthorisation});
  }

  getEmployees(){
    return this.http.post(this.user, {request : "getEmployees"});
  }

  forgotPasswordReq(email : string){
    return this.http.post( this.user, {request : "forgotPassword", payload : { email }});
  }

  populateJobCard( jobCard : any){
    return this.http.post( this.jobCard, {request : "createJobCard", payload : jobCard});
  }

  getMyWorkingCards(){
    return this.http.post<MyWorkingCards[]>( this.jobCard, { request : "getAssignedCurrentJobCards"});
  }

  getMyApprovals(){
    return this.http.post<MyApprovers[]>(this.approver, { request : "myApprovals"});
  }
  ///////////////////////////////////////////////////////
  getDatabaseTables(){
    return this.http.post<DatabaseTable[]>(this.databaseTable, {request : "getDatabaseTables"});
  }
  getRecords(){
    return this.http.post<DatabaseTable[]>(this.databaseTable, {request : "getRecords"});
  }
  //////////////////////////////////////////////////////
  getOperation(){
    return this.http.post<Operation[]>(this.operation, {request : "getOperation"});
  }
  createOperation(operation: any ){
    return this.http.post(this.operation,{request :"createOperation", payload : operation});
  }

  getJobCardInfo(cardId : number){
    return this.http.post<JobCardInfo>(this.jobCard, {request : "getCardInformation", payload : { id : cardId}});
  }

  approveJobCard(cardId : number){
    return this.http.post(this.approver, { request : "approveJobCard", payload : {cardId}});
  }

  rejectJobCard( cardId : number , comment : string){
    return this.http.post(this.approver, { request : "rejectJobCard", payload : {cardId , comment}});
  }

  getCardApproverList(cardId : number){
    return this.http.post<UserApprover[]>(this.approver , {request : "getApproverByCard", payload : {cardId} });
  }

  getEditJobCardReq(cardId : number){
    return this.http.post<JobRequestInfo>( this.jobRequest, {request : "getRequestByJobCardId", payload : { cardId }});
  }
  getEditJobCard( cardId : number){
    return this.http.post<EditJobCard>( this.jobCard, {request : "getJobCardDetails", payload : { cardId }});
  }

  getJobListing(){
    return this.http.post<MyListings[]>( this.jobListing, { request : "getMyJobListings" } );
  }
  getMyApplication(){
    return this.http.post<MyApplication[]>( this.jobListing, { request : "getMyApplications"});
  }

  getApplicationQuestions(cardId : number){
    return this.http.post<ApplicationQuestions>( this.question, { request : "getCardQuestions", payload : { cardId }});
  }

  applyForJob(data, cv : File, test :File){

    let uploadData : FormData = new FormData();
    uploadData.append('request','applyForJob');
    uploadData.append('cv',cv);
    uploadData.append('test',test);
    uploadData.append( 'answers', JSON.stringify(data));
    return this.http.post(this.answer,uploadData);
  }

  getInternalAppJobCard(cardId : number){
    return this.http.post<userCard[]>(this.user, {request : "getInternalApplicants", payload : { cardId } });
  }

  getExternalAppJobCard(cardId : number){
    return this.http.post<userCard[]>(this.user, {request : "getExternalApplicants", payload : { cardId } });
  }

  getApplicantPool(cardId : number){
    return this.http.post<ApplicantPoolCard []>(this.user, {request : "getApplicantsForCard", payload : { cardId }});
  }

  changeApplicantPool(applicationId : number , statusId : number){
    return this.http.post(this.application, { request : "changeStatus", payload : { applicationId , statusId}});
  }

  createInterviews(payload : any){
    return this.http.post( this.interview, {request : "createInterview", payload});
  }

  editInterview(payload : any){
    return this.http.post( this.interview, {request : "editInterview", payload});
  }

  getUpComingInterviews(cardId : number){
    return this.http.post<UpCommingInterviews[]>( this.interview, {request : "getInterViewByCard", payload : { cardId } });
  }

  getPassedInterviews(cardId : number){
    return this.http.post<PassedInterview[]>( this.interview, {request : "getPassedInterviews", payload : { cardId } });
  }

  cardPublished(id:number){
    return this.http.post( this.jobCard, {request : "isCardPublished", payload : { id } });
  }

  getCardStatus(cardId: number){
    return this.http.post<CardStatus>( this.jobCard, { request : "getCardStatus", payload : { cardId } })
  }

  confirmCard( cardId : number){
    return this.http.post(this.jobCard, {request : "hrManagerConfirmation", payload : { cardId }});
  }

  requestConfirmation(cardId : number){
    return this.http.post(this.jobCard, {request : "recruiterConfirmation", payload : { cardId }});
  }

  publishCard(id:number){
    return this.http.post( this.jobCard, {request : "publishJobCard", payload : { id } });
  }

  unPublishCard(id:number){
    return this.http.post( this.jobCard, {request : "unPublishJobCard", payload : { id } });
  }

  getApplication(id:number){
    return this.http.post( this.application, {request : "getApplication", payload : { id } });
  }

  getMyInterviews(){
    return this.http.post<ScheduledInterview>( this.interview, {request :"getMyInterviews"});
  }

  getInterviewDetails(interviewId : number){
    return this.http.post( this.interview, { request : "getApplicantInterviews", payload : { interviewId} })
  }

  makeRating( obj : any){
    return this.http.post( this.interview, { request : "makeInterviewRating", payload : obj })
  }

  overAllComment( obj : any){
    return this.http.post( this.interview, {request : "updateOverallComment", payload : obj});
  }

  getHrConfirmations(){
    return this.http.post( this.jobCard, { request : "getMyHrConfirmations"});
  }

  createEmployeeDetails(interviewId : number){
    return this.http.post<CreateEmployee>( this.user, { request : "getUserByInterview", payload : { interviewId }});
  }

  getUserRoles(userId : number){
    return this.http.post<Role[]>( this.user, { request : "getUserRoles", payload : { userId }});
  }

  addUserRole(roleId : number,userId : number){
    return this.http.post( this.role, {request : "addAUserRole", payload : { roleId, userId}});
  }

  removeUserRole(roleId : number,userId : number){
    return this.http.post( this.role, {request : "removeAUserRole", payload : { roleId, userId}});
  }
  getInterviewById(id){
    return this.http.post<EditInterview>( this.interview, {request : "getInterviewById", payload : { id }});
  }
  updateEmployeeAccount( payload : any){
    return this.http.post( this.user, {request : "updateEmployeeAccountDetails", payload });
  }
  createEmployee( payload : any){
    return this.http.post( this.user, {request : "createAEmployee", payload });
  }
  uploadContract(formData : FormData){
    formData.append('request','applyForJob');
    return this.http.post(this.user,formData);
  }
  getBuildingTables(buildingId : number, dateId : number){
    return this.http.post<Tafel[]>( this.building, {request : "getBuildingTables", payload : { buildingId , dateId} });
  }
  getBookableDates(month : number, year : number){
    return this.http.post<BookingCap>( this.booking, { request : "getUserAndAvailable", payload : { month , year} });
  }
  getEmpBookableDates(month : number, year : number,userId : number){
    return this.http.post<BookingCap>( this.booking, { request : "getEmpAndAvailable", payload : { month , year, userId }});
  }

  userBooking( payload : any){
    return this.http.post( this.booking, {request: "makeIndividualBooking", payload });
  }

  userEmpBooking( payload : any){
    return this.http.post( this.booking, {request: "makeIndividualBookingEmployee", payload });
  }

  cancelUserBooking(payload : any){
    return this.http.post( this.booking, {request : "cancelBooking", payload })
  }
  // edituserBooking(){
  //   THERE IS NO EDIT SO I DONNO IF I SHOULD EDIT OR A USER NEEDS TO FIRST CANCEL A BOOKING
  // }
  getAssistantSearch(){
    return this.http.post( this.booking, {request : "getAssistantSearch"});
  }

  getGroupDates(month : number, year : number){
    return this.http.post<GroupBookingCap>( this.booking, { request : "getGroupAndAvailable", payload : { month , year} });
  }

  getBoardRoomSlots(buildingId,dateId){
    return this.http.post<SlotTable[]>( this.booking, { request : "getBuildingSlots", payload : { buildingId , dateId} });
  }

  makeGroupBooking(){

  }
  cancelBooking(bookingId : number){
    return this.http.post( this.booking, {request :"cancelBooking", payload : { bookingId}});
  }

  makeOwnGroupBooking( payload : any){
    return this.http.post( this.booking, {request : "makeGroupBooking", payload})
  }
  makeEmpGroupBooking( payload : any){
    return this.http.post( this.booking, {request : "makeGroupBookingEmployee", payload})
  }

  makeBackup(){
    return this.http.post( this.backUp, { request : "backup"})
  }
  restoreBackup(){
    return this.http.post( this.backUp, { request : "restore"})
  }
  ////////////////////////////////////Audit Log////////////////////////////////////////////////////////
  getAudits(){
    return this.http.post<Audit[]>( this.audit, {request : "getAudits" });
  }

  getHomeCards(){
    return this.http.post<HomeCard>( this.user, {request : "getHomeData"})
  }


}
