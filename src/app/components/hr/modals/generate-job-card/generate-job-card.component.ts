import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectRequestComponent } from '../reject-request/reject-request.component';
import { JobRequestInfo } from 'src/app/models/jobReqDetails';
import { ApiService } from 'src/app/services/api.service';
import { UserProfile } from 'src/app/models/userProfile';
import { ToastsService } from 'src/app/services/toasts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';

@Component({
  selector: 'app-generate-job-card',
  templateUrl: './generate-job-card.component.html',
  styleUrls: ['./generate-job-card.component.css']
})
export class GenerateJobCardComponent implements OnInit {

  @Input() requestDetails : JobRequestInfo = null;

  managerList : UserProfile [] = [];
  reqruiterList : UserProfile [] = [];
  accepted : boolean = false;
  constructor( private modal: NgbModal, public activeModal : NgbActiveModal, private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder, private jobHelper : JobCardHelperService) { }

  ngOnInit(): void {
    this.getData();
    this.buildForms();
  }

  getData(){
    this.getHiringTeam();
  }
  rejectRequest(){
    const modalInstance = this.modal.open(RejectRequestComponent);
    modalInstance.componentInstance.jobRequest = this.requestDetails;
  }
  hiringTeamForm : FormGroup;

  buildForms(){
    let manager = this.requestDetails.user.id;
    console.log(manager);
    this.hiringTeamForm = this.formBuilder.group({
      recruiterId : [null, [Validators.required]],
      managerId : [ manager, [Validators.required]]
    });

  }

  makeDecision(decision : string){

    if(decision ==="accept"){
      this.accepted = !this.accepted;
    }
    else if(decision ==="reject"){

    }
  }

  getHiringTeam(){
    this.api.getHiringTeam().subscribe( success => this.retHiringTeamSuccess(success), err => this.retHiringTeamFailed(err));
  }

  retHiringTeamSuccess( success ){
    console.log(success);
    this.reqruiterList = success.recruiterList;
    this.managerList = success.managerList;
  }
  retHiringTeamFailed( error ){
    this.toast.display({type : "Error", heading : error?.error?.Title , message : error.error.message + "\n" + error.message});
  }

  getHiringTeamDetails(){
    return {
      recruiter : this.hiringTeamForm.get('recruiterId').value,
      hiringManager : this.hiringTeamForm.get('managerId').value,
      jrequestId : this.requestDetails.id
    }
  }

  save(){
    let formDetails = this.getHiringTeamDetails();
    this.api.setUpHiringTeam(formDetails).subscribe( success => this.saveSuccess(success), error => this.saveError(error));
  }

  saveSuccess( success ){
    this.toast.display({type : "Success", heading : success.Title, message : success.message});
    this.jobHelper.emitRefresh();
    this.activeModal.close();
  }
  saveError( error){
    this.toast.display({type : "Error", heading : error.error?.Title, message : error.message + "\n"+ error.message});
  }
}
