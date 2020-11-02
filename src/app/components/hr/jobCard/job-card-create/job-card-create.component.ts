import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import Stepper from 'bs-stepper';
import { JobRequestInfo } from 'src/app/models/jobReqDetails';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { Observer, Observable, Subject, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, AbstractControl } from '@angular/forms';
import { Schedule } from 'src/app/models/schedule';
import { RequisitionApproval } from 'src/app/models/requisitionApproval';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Location } from 'src/app/models/location';
import { Test } from 'src/app/models/test';
import { Language } from 'src/app/models/language';
import { Skill } from 'src/app/models/skill';
import { LongQuestion } from 'src/app/models/longQuestion';
import { Requirement } from 'src/app/models/requirement';
import { userLite } from 'src/app/models/userLite';
import { userCard } from 'src/app/models/userCard';
import { UserProfile } from 'src/app/models/userProfile';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EditJobCard } from 'src/app/models/editJobCard';
import { FilterName } from 'src/app/components/system/pipes/filterName.pipe'

function dateVerify(control : AbstractControl){
  let currentDate = new Date();
  let controlDate = new Date(control.value);
  if( controlDate <= currentDate)
    return { invalidDate : true}
  return null;
}

const validatePublish: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('publishDate').value;
  const end = fg.get('closingDate').value;
  return start !== null && end !== null && start < end
    ? null
    : { publish: true };
};

const validateContractDate: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('startDate').value;
  const end = fg.get('endDate').value;
  return start !== null && end !== null && start < end
    ? null
    : { contract: true };
};

@Component({
  selector: 'app-job-card-create',
  templateUrl: './job-card-create.component.html',
  styleUrls: ['./job-card-create.component.css']
})
export class JobCardCreateComponent implements OnInit, OnDestroy {

  @Input() editing : boolean = false;

  applicantSearch : string
  payload : any = {};

  basicDetails : FormGroup;
  testForm : FormGroup;
  language : FormGroup;
  skill : FormGroup;
  longQuestion : FormGroup;
  requirement : FormGroup;

  requestDetails : JobRequestInfo;

  pageSize : number = 10;
  testCollectionSize : number;
  languageCollectionSize : number;
  skillCollectionSize : number;
  longQuestionCollectionSize : number;
  requirementCollectionSize : number;
  
  page : number = 1;
  langPage : number = 1;
  skillpage : number = 1;
  questionPage : number = 1
  requirementPage : number = 1;

  employees : userCard [] =[];
  approvers : userCard [] = [];

  locations : Location [] = [];
  addedLocations : Location [] = [];

  schedules : Schedule [] = [];
  addedSchedules : Schedule [] = [];

  rApprovals : RequisitionApproval [] = [];
  addedRApprovals : RequisitionApproval [] = [];

  languages : Language [] = [];
  addedLanguages : Language [] = [];

  skills : Skill [] = [];
  addedSkills : Skill [] = [];

  longQuestions : LongQuestion [] = [];
  addedLongQuestions : LongQuestion [] = [];


  requirements : Requirement [] = [];
  addedRequirements : Requirement [] = [];

  tests : Test [] = [];
  addedTests : Test [] = [];

  constructor(private cardHelper : JobCardHelperService , private formBuilder : FormBuilder, private api : ApiService, private toast : ToastsService, private activeModal : NgbActiveModal) { }

  private stepper: Stepper;
  private jobHelpSub : Subscription;
  test(){
    console.log(this.basicDetails);
  }
  buildForm(){
    this.basicDetails = this.formBuilder.group({
      jobCardName : ['',[Validators.required]],
      startDate : [null,[Validators.required,dateVerify]],
      endDate : [ null, [Validators.required]],
      introduction : ['',[Validators.required]],
      description : ['', [Validators.required]],
      travel : [false,],
      publishDate : ['',[Validators.required,dateVerify]],
      closingDate : ['',[Validators.required]],
      scheduleId : [null, [Validators.required]],
      locationId : [null, [Validators.required]],
      raApprovalId : [+3, [Validators.required]],
      workingHours : [null,[Validators.required,Validators.min(0)]]
    },{
      validators : [validatePublish, validateContractDate]
    });

    this.testForm = this.formBuilder.group({questions : FormArray});
  }

  getBasicFrom(){
    return {
      jobCardName : this.basicDetails.get('jobCardName').value,
      startDate : this.basicDetails.get('startDate').value,
      endDate : this.basicDetails.get('endDate').value,
      introduction : this.basicDetails.get('introduction').value,
      description : this.basicDetails.get('description').value,
      travel : this.basicDetails.get('travel').value,
      publishDate : this.basicDetails.get('publishDate').value,
      closingDate : this.basicDetails.get('closingDate').value,
      scheduleId : this.basicDetails.get('scheduleId').value,
      locationId : this.basicDetails.get('locationId').value,
      raApprovalId : this.basicDetails.get('raApprovalId').value,
      workingHours : this.basicDetails.get('workingHours').value,

    }

  }
  ngOnInit() {
    this.jobHelpSub = this.cardHelper.jobDescriptionInfo.subscribe( val => this.setJobRequest(val));
    this.buildForm();
    this.getData();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    });

    
  }

  ngOnDestroy(){
    this.jobHelpSub.unsubscribe();
  }

  saveJobCard(){
    this.payload.approvers = this.approversObj();
    this.payload.longQuestions = this.questionsObj();
    this.payload.requirements = this.requirementsObj();
    this.payload.languages = this.languagesObj();
    this.payload.skills = this.skillsObj();
    this.payload.basicDetails = this.getBasicFrom();
    this.payload.tests = this.testsObj();
    this.payload.id = this.requestDetails.jobCardId;
    this.api.populateJobCard(this.payload).subscribe( success => this.successUploadCard(success),err => this.failUploadCard(err));
  }

  editCard(){
    this.payload.approvers = this.approversObj();
    this.payload.longQuestions = this.questionsObj();
    this.payload.requirements = this.requirementsObj();
    this.payload.languages = this.languagesObj();
    this.payload.skills = this.skillsObj();
    this.payload.basicDetails = this.getBasicFrom();
    this.payload.tests = this.testsObj();
    this.payload.id = this.requestDetails.jobCardId;
    this.api.editJobCard(this.payload).subscribe( success => this.successUploadCard(success),err => this.failUploadCard(err));
  }
  
  getData(){
    this.getLocations();
    this.getSchedule();
    this.getRapprovals();
    this.getTests();
    this.getLanguages();
    this.getSkills();
    this.getLongQuestions();
    this.getRequirements();
    this.getEmployees();

    if(this.editing)
    {
      //DO STUFF HERE
      setTimeout(x => this.getCardValues(),1500);
    }
  }
  next() {
    this.stepper.next();
  }
  previous() {
    this.stepper.previous();
  }

  onSubmit() {
    return false;
  }

  setJobRequest(val){
    this.requestDetails = val;
  }

  getRapprovals(){
    return this.api.getRequisitionApprovals().subscribe(success => this.getApprovalsSuccess(success), err => this.fetchFailed(err));
  }
  getApprovalsSuccess(success){
    this.rApprovals = success;
  }

  getLocations(){
    return this.api.getLocations().subscribe( r => this.getLocationSuccess(r), error => this.fetchFailed(error));
  }

  getLocationSuccess( success ){
    this.locations = success;
  }

  getSchedule(){
    return this.api.getSchedule().subscribe( success => this.getScheduleSuccess(success), err => this.fetchFailed(err));
  }

  getScheduleSuccess(success){
    this.schedules = success;
  }

  getTests(){
    this.api.getTests().subscribe( success => this.getTestsSuccess(success), err => this.fetchFailed(err))
  }

  getTestsSuccess(success){
    this.tests = success;
    this.testCollectionSize = this.tests.length;
  }

  getLanguages(){
    this.api.getLanguages().subscribe( succ => this.getLanguagesSuccess(succ), err => this.fetchFailed(err));
  }

  getLanguagesSuccess(success){
    this.languages = success;
    this.languageCollectionSize = this.languages.length;
  }

  getSkills(){
    return this.api.getSkills().subscribe( succ => this.getSkillSuccess(succ), err => this.fetchFailed(err))
  }

  getSkillSuccess(succ){
    this.skills = succ;
    this.skillCollectionSize = this.skills.length;
    
  }

  getLongQuestions(){
      return this.api.getLongQuestions().subscribe( succ => this.getLongQuestionSuccess(succ), err => this.fetchFailed(err))
  }
  getLongQuestionSuccess(success){
    this.longQuestions = success;
    this.longQuestionCollectionSize = this.longQuestions.length;
  }

  getRequirements(){
    this.api.getRequirements().subscribe( succ => this.getRequirementSuccess(succ), err => this.fetchFailed(err));
  }

  getRequirementSuccess(requirements){
    this.requirements = requirements;
    this.requirementCollectionSize = this.requirements.length;
  }

  getEmployees(){
    this.api.getEmployees().subscribe( success => this.gotEmployees(success), err => this.fetchFailed)
  }

  gotEmployees(success){
    this.employees = success;
    if(!this.editing){
      this.approvers.push(this.employees.find(x => x.id == this.requestDetails.user.id));
      this.employees = this.employees.filter( x => x.id != this.requestDetails.user.id);
    }
    
  }
  fetchFailed(error){
    this.toast.display({type:"Error",heading: error.error.Title, message : error.error.message});
  }
  //////////////////////////////////
   
  testsFArray = new FormArray([]);
  addTest(id : number){
    let obj = this.tests.find(x => x.testId == id);
    this.addedTests.push(obj);
    this.tests = this.tests.filter( x => x.testId != id);
    this.testsFArray.push(new FormControl(false));
  }

  removeTest(id : number){
    let index = this.addedTests.map( x => {return x.testId;}).indexOf(id);
    let obj = this.addedTests.find(x => x.testId == id);
    this.addedTests = this.addedTests.filter( x => x.testId != id);
    this.testsFArray.removeAt(index);
    this.tests.push(obj);
    
  }
  
  languageFArray = new FormArray([]);
  addLanguage(id : number){
    let obj = this.languages.find(x => x.id == id);
    this.addedLanguages.push(obj);
    this.languages = this.languages.filter( x => x.id != id);
    this.languageFArray.push(new FormControl(false));
  }

  removeLanguage(id : number){
    let index = this.addedLanguages.map( x => { return x.id }).indexOf(id);
    let obj = this.addedLanguages.find(x => x.id == id);
    this.languages.push(obj);
    this.addedLanguages = this.addedLanguages.filter( x => x.id != id);
    this.languageFArray.removeAt(index);
  }

  skillFArray = new FormArray([]);
  addSkill(id : number){
    let obj = this.skills.find(x => x.id == id);
    this.addedSkills.push(obj);
    this.skills = this.skills.filter( x => x.id != id);
    this.skillFArray.push(new FormControl(false));
  }

  removeSkill(id : number){
    let index = this.addedSkills.map( x => { return x.id }).indexOf(id);
    let obj = this.addedSkills.find(x => x.id == id);
    this.skills.push(obj);
    this.addedSkills = this.addedSkills.filter( x => x.id != id);
    this.skillFArray.removeAt(index);
  }
  requirementFArray = new FormArray([]);
  addRequirement(id : number){
    let obj = this.requirements.find(x => x.id == id);
    this.addedRequirements.push(obj);
    this.requirements = this.requirements.filter( x => x.id != id);
    let group = new FormGroup({expectedAnswr : new FormControl(null,[Validators.required]), critical : new FormControl(false)});
    this.requirementFArray.push(group);
  }

  removeRequirement(id : number){
    let index = this.addedRequirements.map( x => { return x.id }).indexOf(id);
    let obj = this.addedRequirements.find(x => x.id == id);
    this.requirements.push(obj);
    this.addedRequirements = this.addedRequirements.filter( x => x.id != id);
    this.requirementFArray.removeAt(index);
  }

  questionFArray = new FormArray([]);
  addLQuestion(id : number){
    let obj = this.longQuestions.find(x => x.id == id);
    this.addedLongQuestions.push(obj);
    this.longQuestions = this.longQuestions.filter( x => x.id != id);
    this.questionFArray.push(new FormControl(false));
  }

  removeQuestion(id : number){
    let index = this.addedLongQuestions.map( x => { return x.id }).indexOf(id);
    let obj = this.addedLongQuestions.find(x => x.id == id);
    this.longQuestions.push(obj);
    this.addedLongQuestions = this.addedLongQuestions.filter( x => x.id != id);
    this.questionFArray.removeAt(index);
  }

  addApprover(id : number){
    let person = this.employees.find(x => x.id === id);
    this.approvers.push(person);
    this.employees = this.employees.filter( x => x.id != id);

  }
  removeApprover(id : number){
    let person = this.approvers.find(x => x.id === id);
    this.employees.push(person);
    this.approvers = this.approvers.filter( x => x.id != id);
  }

  languagesObj(){
    return this.addedLanguages.map( (x, i)=>{
      return { id : +x.id, critical : +this.languageFArray.at(i).value};
  });
  }

  skillsObj(){
    return this.addedSkills.map( (x, i)=>{
        return { id : +x.id, critical : +this.skillFArray.at(i).value};
    });
  }
  requirementsObj(){
    return this.addedRequirements.map( (x, i) =>{
      return { id : +x.id, expectedAnswer : +this.requirementFArray.at(i).get('expectedAnswr').value, critical : +this.requirementFArray.at(i).get('critical').value};
    });
  }

  questionsObj(){
      return this.addedLongQuestions.map( (x , i) =>{
        return { id : +x.id, critical : +this.questionFArray.at(i).value };
      });
  }

  approversObj(){
    return this.approvers.map(x => {
      return { id : +x.id};
    });
  }

  testsObj(){
    return this.addedTests.map( (x , i)=>{
      return { id : x.testId, critical : this.testsFArray.at(i).value};
    });
  }

  successUploadCard(success){
    this.cardHelper.emitRefresh();
    this.toast.display({type : "Success", heading : success.Title, message : success.message});
    this.activeModal.close();
  }

  failUploadCard(error){
    console.log(error);
    this.toast.display({type:"Error",heading: error.error.Title, message : error.error.message+" "+error});
  }

  getCardValues(){
    this.api.getEditJobCard(this.requestDetails.jobCardId).subscribe( succ => this.getCardValueSucc(succ), err => this.getCardValueFailed(err))
  }
  getCardValueSucc(succ : EditJobCard){
    console.log("VALUES");
    console.log(succ);
    this.setBasicDetails(succ);
    this.setTests(succ);
    this.setSkills(succ);
    this.setApprovers(succ);
    this.setLanguages(succ);
    this.setRequirements(succ);
    this.setLongQuestions(succ);
  }
  getCardValueFailed(err){
    this.failUploadCard(err);
    this.activeModal.close();
  }

  setBasicDetails(details : EditJobCard){
    this.basicDetails.setValue(details.basicDetails);
  }

  setTests(details : EditJobCard){
    details.tests.forEach( (el, index) => {
      this.addTest(+el.testId);
      this.testsFArray.controls[index].setValue(+el.critical);
    });
  }
  setRequirements(details : EditJobCard){

    details.requirements.forEach( (el, index) => {
      this.addRequirement(+el.id);
      this.requirementFArray.controls[index].setValue({expectedAnswr : +el.expectedAnswer, critical : +el.critical});
    });
  }
  setLanguages(details : EditJobCard){
    details.languages.forEach( (el, index) => {
      this.addLanguage(+el.id);
      this.languageFArray.controls[index].setValue(+el.critical);
    });
  }
  setSkills(details : EditJobCard){
    details.skills.forEach( (el, index) => {
      this.addSkill(+el.id);
      this.skillFArray.controls[index].setValue(+el.critical);
    });
  }
  setLongQuestions(details : EditJobCard){
    console.log(details.longQuestions);
    details.longQuestions.forEach( (el, index) => {
      this.addLQuestion(+el.id);
      this.questionFArray.controls[index].setValue(+el.critical);
    });
  }

  setApprovers(details : EditJobCard){
    details.approvers.forEach( el => this.addApprover(el.id));
    
    // this.employees = this.employees.filter( emp => details.approvers.find(x => x.id = emp.id));
  }


}
