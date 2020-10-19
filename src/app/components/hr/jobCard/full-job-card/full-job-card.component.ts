import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterviewOverviewComponent } from '../../modals/interview-overview/interview-overview.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserApprover } from 'src/app/models/userApprover';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { JobCardCreateComponent } from '../job-card-create/job-card-create.component';
import { userCard } from 'src/app/models/userCard';
import { ApplicantPoolCard } from 'src/app/models/applicantPool';
import { UpCommingInterviews } from 'src/app/models/upComingInterviews';
import { PassedInterview } from 'src/app/models/passedInterview';
import { CardStatus } from 'src/app/models/cardStatus';
import { AuthService } from 'src/app/services/auth.service';
import { CreateInterviewComponent } from '../../modals/create-interview/create-interview.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-full-job-card',
  host: {class:'full-component'},
  templateUrl: './full-job-card.component.html',
  styleUrls: ['./full-job-card.component.css']
})
export class FullJobCardComponent implements OnInit, OnDestroy {

  private routeSub : Subscription;
  private helperSub : Subscription;


  searchControl : FormControl = new FormControl();
  typeControl : FormControl = new FormControl();

  cardStatus : CardStatus = null;
  isHrManager : boolean = false;
  isReqruiter : boolean = false;
  cardPublished : boolean = false;

  routeId : number;
  approvers : UserApprover [] = [];
  internalApplicants : userCard [] = [];
  externalApplicants : userCard [] = [];

  upComingInterviews : UpCommingInterviews [] = [];
  passedInterviews : PassedInterview [] = [];
  
  shortList : ApplicantPoolCard [] = [];
  undecided : ApplicantPoolCard [] = [];
  disqualified : ApplicantPoolCard [] = [];

  constructor( private modal : NgbModal, 
    private api : ApiService,
     private toast : ToastsService,
      private router : ActivatedRoute,
       private helper : JobCardHelperService, 
       private auth : AuthService) { }

  ngOnInit(): void {
    this.routeSub =  this.router.params.subscribe( params => {this.routeId = params['id']});
    this.helperSub = this.helper.shouldRefresh$.subscribe(x => this.getUpComing(this.routeId))
    this.loadData();
  }

  loadData(){
    this.getApproverList();
    this.getJobRequest();
    this.getInternalApplicants();
    this.getExternalApplicants();
    this.getAllApplicants();
    this.getUpComing(this.routeId);
    this.getCardStatus();
    this.getPassedInterviews();
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
    this.helperSub.unsubscribe();
  }

  openOverallInterview(interviewId : number){
    const modalInstance = this.modal.open(InterviewOverviewComponent, {windowClass :"largeModal"});
    modalInstance.componentInstance.interviewId = interviewId;
  }

  getApproverList(){
    this.api.getCardApproverList(this.routeId).subscribe( succ => this.getApproversSuccess(succ), err => this.loadError(err));
  }

  loadError(error){
    this.toast.display({type : "Error", heading : error.error.Title, message : error.error.message});
  }
  getApproversSuccess(success : UserApprover []){
    this.approvers = success;
  }

  getJobRequest(){
    this.api.getEditJobCardReq(this.routeId).subscribe( succ => {this.helper.changeCard(succ);
    }, err=> this.loadError(err));
  }
  editCard(){
   const modalInstance = this.modal.open(JobCardCreateComponent,{windowClass : "hugeModal"});
   modalInstance.componentInstance.editing = true;
  }

  getAllApplicants(){
    this.api.getApplicantPool(this.routeId).subscribe( succ => this.gotAllApplicants(succ), err => this.loadError(err));
    this.getCardStatus();
  }
  gotAllApplicants( success : ApplicantPoolCard []){
    this.undecided = [];
    this.shortList = [];
    this.disqualified = [];
    success.forEach(el =>{
      if(el.status == "undecided")
        this.undecided.push(el);
      else if(el.status == "unsuccessful")
        this.disqualified.push(el)
      else if(el.status == "successful")
        this.shortList.push(el)
    });
  }

  getInternalApplicants(){
    this.api.getInternalAppJobCard(this.routeId).subscribe( succ => this.getInternalSuccess(succ), err=> this.loadError(err));
  }
  getExternalApplicants(){
    this.api.getExternalAppJobCard(this.routeId).subscribe( succ => this.getExternalSuccess(succ), err=> this.loadError(err));
  }

  getExternalSuccess(success){
    this.externalApplicants = success;
  }

  getInternalSuccess(success){
    this.internalApplicants = success;
  }

  routeRequest(event){
    if(event.to == "shortList"){
      this.moveToShortList(event.applicationId);
    }
    else if(event.to == "undecided"){
      this.moveToUndecided(event.applicationId);
    }
    else if(event.to == "disqualify"){
      this.moveToDisqualified(event.applicationId);
    }
  }
  moveToShortList(applicationId : number){
    
    this.updateApplication(+applicationId,6);
  }
  moveToUndecided(applicationId : number){
    
    this.updateApplication(+applicationId,8);
  }

  moveToDisqualified(applicationId : number){
    this.updateApplication(+applicationId,7);
  }

  updateApplication(id , status){
    this.api.changeApplicantPool(id,status).subscribe( s => this.getAllApplicants(), er => this.loadError(er));
  }

  getUpComing(cardId : number){
    this.api.getUpComingInterviews(cardId).subscribe( s => this.upComingInterviews = s, err => this.loadError(err));
  }

  approved(){
    let answers = this.approvers.map(x => x.approved);
    let approved = answers.reduce((t,current)=>{
      if(current)
        return t+=1;
    },0);
  
    if(approved == answers.length){
      return true;
    } 
    else{
      return false;
    }
  }
  getCardStatus(){
    this.api.cardPublished(this.routeId).subscribe(x => this.cardPublished = (<any>x).published, e => this.loadError(e));
    this.api.getCardStatus(this.routeId).subscribe(
      x => {this.cardStatus = x;
        if(this.cardStatus.recruiterId == this.auth.userId)
          this.isReqruiter = true;
        else if(this.cardStatus.hrManagerId == this.auth.userId)
          this.isHrManager = true;

      }, e => this.loadError(e))
  }
  togglePublish(){
    if(!this.cardPublished){
      this.api.publishCard(this.routeId).subscribe( x => 
        {
          this.toast.display({type:"Success",heading : (<any>x).Title, message: (<any>x).message});
          this.getCardStatus();
        }
        ,e =>  this.toast.display({type:"Success",heading : (<any>e).Title, message: (<any>e).message})
       );
    }
    else{
      this.api.unPublishCard(this.routeId).subscribe( x => 
        {
          this.toast.display({type:"Success",heading : (<any>x).Title, message: (<any>x).message});
          this.getCardStatus();
        }
        ,e =>  this.toast.display({type:"Success",heading : (<any>e).Title, message: (<any>e).message})
       );
    }
  }

  getPassedInterviews(){
    this.api.getPassedInterviews(this.routeId).subscribe( res => {
      this.passedInterviews = res
    }, er => this.loadError(er));
  }

  recruiterConfirm(){
    this.api.requestConfirmation(this.routeId).subscribe( suc =>
      { 
        this.toast.display({type : "Success", heading : (<any>suc).Title, message : (<any>suc).message});
    }, e => this.loadError(e))
  }

  hrConfirm(){
    this.api.confirmCard(this.routeId).subscribe( suc =>
      { 
        this.toast.display({type : "Success", heading : (<any>suc).Title, message : (<any>suc).message});
        this.getCardStatus();
    }, e => this.loadError(e))
  }

  editInterview(id : number){
    const modalInstance = this.modal.open(CreateInterviewComponent,{ windowClass : "largeModal"});
    modalInstance.componentInstance.interviewId = id;
  }

  disqualifyNonShortlisted(){
    this.undecided.forEach(x => this.moveToDisqualified(x.applicationId));
  }

  closeJobCard(){
    
  }
}
