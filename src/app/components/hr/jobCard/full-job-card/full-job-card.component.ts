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

@Component({
  selector: 'app-full-job-card',
  host: {class:'full-component'},
  templateUrl: './full-job-card.component.html',
  styleUrls: ['./full-job-card.component.css']
})
export class FullJobCardComponent implements OnInit, OnDestroy {

  private routeSub : Subscription;
  routeId : number;
  approvers : UserApprover [] = [];
  internalApplicants : userCard [] = [];
  externalApplicants : userCard [] = [];

  upComingInterviews : UpCommingInterviews [] = [];
  
  shortList : ApplicantPoolCard [] = [];
  undecided : ApplicantPoolCard [] = [];
  disqualified : ApplicantPoolCard [] = [];

  constructor( private modal : NgbModal, private api : ApiService, private toast : ToastsService, private router : ActivatedRoute, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.routeSub =  this.router.params.subscribe( params => {this.routeId = params['id']});
    this.loadData();
  }

  loadData(){
    this.getApproverList();
    this.getJobRequest();
    this.getInternalApplicants();
    this.getExternalApplicants();
    this.getAllApplicants();
    this.getUpComing(this.routeId);
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  openOverallInterview(){
    const modalInstance = this.modal.open(InterviewOverviewComponent, {windowClass :"largeModal"});
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
    this.api.getApplicantPool(this.routeId).subscribe( succ => this.gotAllApplicants(succ), err => this.loadError(err))
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
    console.log(event);
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
}
