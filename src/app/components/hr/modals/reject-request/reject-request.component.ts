import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobRequestInfo } from 'src/app/models/jobReqDetails';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';

@Component({
  selector: 'app-reject-request',
  templateUrl: './reject-request.component.html',
  styleUrls: ['./reject-request.component.css']
})
export class RejectRequestComponent implements OnInit {

  @Input() jobRequest : JobRequestInfo;

  constructor( public activeModal : NgbActiveModal, private modal : NgbModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder, private jobHelper : JobCardHelperService) { }

  rejectForm : FormGroup;
  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(){
    this.rejectForm = this.formBuilder.group({
      rejectionMessage : ['',[Validators.required]]
    });
  }

  getFormDetails(){

    return {
      jrequestId : this.jobRequest.id,
      message : this.rejectForm.get('rejectionMessage').value
    }
  }

  save(){
    this.api.rejectRequest(this.getFormDetails()).subscribe( success => this.rejectSuccess(success), err => this.rejectFailed(err))
  }
  rejectFailed( fail){
    this.toast.display({type : "Error", heading : fail.Title, message : fail.message});
    
  }

  rejectSuccess( success ){
    this.toast.display({type : "Success", heading : success.Title, message : success.message});
    this.jobHelper.emitRefresh();
    this.modal.dismissAll();
  }


}
