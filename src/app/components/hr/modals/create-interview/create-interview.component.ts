import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from 'bs-stepper';
import { ApplicantPoolCard } from 'src/app/models/applicantPool';
import { userCard } from 'src/app/models/userCard';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
@Component({
  selector: 'app-create-interview',
  templateUrl: './create-interview.component.html',
  styleUrls: ['./create-interview.component.css']
})
export class CreateInterviewComponent implements OnInit {

  @Input() applicant : ApplicantPoolCard;
  private stepper : Stepper;

  appointmentForm : FormGroup;
  employees : userCard [] = [];
  interviewers : userCard [] = [];
  constructor(private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder, private activeModal : NgbActiveModal) { }

  ngOnInit() {
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
    this.loadData();
    this.buildForm();
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
    this.interviewers.push(this.employees.find(x => x.id));
    this.employees = this.employees.filter(x => x.id != id);
  }

  removeInterviewer(id : number){
    this.employees.push(this.interviewers.find(x => x.id));
    this.interviewers = this.interviewers.filter(x => x.id != id);
  }

  save(){
    let payload = this.appointmentForm.value;
    payload.interviewers = this.interviewers.map(x => x.id);
    payload.applicationId = +this.applicant.applicationId;
    payload.cardId = +this.applicant.cardId;
    this.api.createInterviews(payload).subscribe( suc => this.madeInterview(suc), err => this.fetchFailed(err));
  }

  madeInterview(msg){
    this.toast.display({type : "Success",heading : msg.Title, message : msg.message});
    this.activeModal.close();
  }

}
