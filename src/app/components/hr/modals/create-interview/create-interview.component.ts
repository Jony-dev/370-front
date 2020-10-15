import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { Observable } from 'rxjs';
import { ApplicantPoolCard } from 'src/app/models/applicantPool';
import { EditInterview } from 'src/app/models/editInterview';
import { userCard } from 'src/app/models/userCard';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';
@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css']
})
export class CreateInterviewComponent implements OnInit {

  @Input() interviewId : number = null;

  @Input() applicant : ApplicantPoolCard;
  private stepper : Stepper;

  interviewDetials : EditInterview;
  appointmentForm : FormGroup;
  employees : userCard [] = [];
  interviewers : userCard [] = [];
  constructor(private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder, public activeModal : NgbActiveModal, private helper : JobCardHelperService) { }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    this.buildForm();
    this.loadData();
    
  }

  next() {
    this.stepper.next();
  }
  previous() {
    this.stepper.previous();
  }

  buildForm(){
    this.appointmentForm = this.formBuilder.group({
      date : [null,[Validators.required]],
      time : [null,[Validators.required]],
      place : ['',[Validators.required]],
    })
  }
  loadData(){
    this.getEmployees();
    if(this.interviewId){
      this.getInterviewDetails();
      
    }
  }

  getInterviewDetails(){
    this.api.getInterviewById(this.interviewId).subscribe( suc => 
      {
        this.interviewDetials = suc;
        this.applicant = <any>this.interviewDetials.applicant;
        this.appointmentForm.setValue({
          date : this.interviewDetials.date,
          time : this.interviewDetials.time,
          place : this.interviewDetials.place
        })
        
        this.interviewDetials.interviewers.forEach( el => this.addInterviewer(el.id));
        
      },
       er => {this.fetchFailed(er); this.activeModal.close()})
  }

  getEmployees(){
    this.api.getEmployees().subscribe( success => this.gotEmployees(success), err => this.fetchFailed(err))
  }

  gotEmployees(success){
    this.employees = success;
  }
  fetchFailed(err){
    this.toast.display({type:"Error",heading: err.error.Title, message : err.error.message});
  }

  addInterviewer(id : number){
    this.interviewers.push(this.employees.find(x => x.id == id));
    this.employees = this.employees.filter(x => x.id != id);
  }

  removeInterviewer(id : number){
    this.employees.push(this.interviewers.find(x => x.id == id));
    this.interviewers = this.interviewers.filter(x => x.id != id);
  }

  save(){
    let payload = this.appointmentForm.value;
    payload.interviewers = this.interviewers.map(x => x.id);
    payload.applicationId = +this.applicant.applicationId;
    payload.cardId = +this.applicant.cardId;
    payload.interviewId = +this.interviewId;
    console.log(payload);
    if(!this.interviewId)
      this.api.createInterviews(payload).subscribe( suc => this.madeInterview(suc), err => this.fetchFailed(err));
    else
      this.api.editInterview(payload).subscribe( suc => this.madeInterview(suc), err => this.fetchFailed(err));
  }

  madeInterview(msg){
    this.toast.display({type : "Success",heading : msg.Title, message : msg.message});
    this.helper.emitRefresh();
    this.activeModal.close();
  }

}
