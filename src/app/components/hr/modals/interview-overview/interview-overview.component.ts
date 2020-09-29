import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { CreateEmployeeComponent } from '../../createEmployee/create-employee/create-employee.component';

@Component({
  selector: 'app-interview-overview',
  templateUrl: './interview-overview.component.html',
  styleUrls: ['./interview-overview.component.css']
})
export class InterviewOverviewComponent implements OnInit {

  @Input() interviewId : number = null;

  interviewDetails : any = null;
  commentForm : FormGroup;
  constructor( private modal : NgbActiveModal, private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loadData();
    this.buildForm();
  }

  buildForm(){
    this.commentForm = this.formBuilder.group({
      comment : [this.interviewDetails?.overallComment, [Validators.required]]
    })
  }
  hire(){
    this.modal.close();
  }

  loadData(){
    this.getInterviewDetails();
  }
  failed(err){
    this.toast.display({type : "Error", heading : err.error.title, message : err.error.message});
  }
  getInterviewDetails(){
    this.api.getInterviewDetails(this.interviewId).subscribe( res => {this.interviewDetails = res; this.commentForm.setValue({comment : (<any>res).overallComment})}, er => this.failed(er));
  }

  getFormDetails(){
    return {
      interviewId : this.interviewId,
      comment : this.commentForm.get('comment').value
    }
  }

  saveComment(){
    let details = this.getFormDetails();
    this.api.overAllComment(details).subscribe( 
      succ => this.toast.display({type : "Success", heading : (<any>succ).Title, message : (<any>succ).message}),
      err => this.toast.display({type : "Error", heading : (<any>err).Title, message : (<any>err).message}))
  }
}
