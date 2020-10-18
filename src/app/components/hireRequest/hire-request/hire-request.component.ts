import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { Justification } from 'src/app/models/justification';
import { Job } from 'src/app/models/job';
import { JobReqCard } from 'src/app/models/jobReqCard';

@Component({
  selector: 'app-hire-request',
  host: {class:'full-component'},
  templateUrl: './hire-request.component.html',
  styleUrls: ['./hire-request.component.css']
})
export class HireRequestComponent implements OnInit {

  editingCard : JobReqCard;
  editing : boolean = false;
  editToggle : boolean = false;
  requestForm : FormGroup;
  justifications : Justification [] = [];
  jobs : Job [] = [];
  requests : JobReqCard [] = [];
  constructor(private toast: ToastsService, private formBuilder : FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.getData();
    this.buildForm();
  }

  buildForm(){

    this.requestForm = this.formBuilder.group({
        justification : [null, [Validators.required]],
        job : [null, [Validators.required]],
        requestDate :[null, [Validators.required]],
        brief : ['',[Validators.required]]
    })

  }

  getData(){
    this.api.getJustifications().subscribe( success => this.justificationRetSuccess(success), error => this.justificationRetFail(error));
    this.api.getDeletedJobPositions().subscribe( success => this.jobRetSuccess(success), error => this.jobRetFail(error));
    this.getRequestCards();

  }
  justificationRetSuccess(success){
    console.log(success);
    this.justifications = success;
  }
  justificationRetFail(error){
    this.toast.display({type:"Error",heading : error.error.Title, message : error.error.message + "\n"+ error.message});

  }
  jobRetSuccess(success){
    this.jobs = success;
  }
  jobRetFail(error){
    this.toast.display({type:"Error",heading : error.error.Title, message : error.error.message + "\n"+ error.message});
  }

  makeRequest(){
    this.api.createJobRequest(this.getFormDetails()).subscribe( success =>{
      this.requestSuccess(success);
    },error=>{
      this.requestSuccess(error);
    })
  }

  requestSuccess(success : any){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.requestForm.reset();
    this.getData();
  }
  requestFailed(error : any){
    this.toast.display({type:"error", heading : error.Title, message : error.message});

  }

  getFormDetails(){

    return {
      justificationId : this.requestForm.get('justification').value,
      jobId : this.requestForm.get('job').value,
      brief : this.requestForm.get('brief').value,
      fulfilmentDate : this.requestForm.get('requestDate').value,
    }
  }

  getRequestCards(){

    this.api.getJobRequestCards().subscribe( success => this.getCardsSuccess(success), error => this.getCardsFailed(error))

  }
  getCardsSuccess(success){
    console.log(success);
    this.requests = success;
  }

  getCardsFailed(error){
    this.toast.display({type : "Error", heading : error.error.Title , message : error.error.message + "\n" + error.message});
  }
  toggleForm(type : boolean){
    this.editToggle = !this.editToggle;
    setTimeout( ()=>{
      this.editToggle = !this.editToggle;
      this.editing = type;
    },400);
  }

  cancelEditing(){
    this.toggleForm(false);
    setTimeout( ()=>{
    this.requestForm.reset();},300);
  }
  fillForm(event : JobReqCard){

    this.editingCard = event;
    this.toggleForm(true);
    setTimeout( ()=>{
      this.requestForm.setValue({
        justification : event.justificationId,
        job : event.jobId,
        requestDate : event.fulfillmentDate,
        brief : event.brief
      });
    },300)

  }

  saveChanges(){
      let job : JobReqCard = <JobReqCard><unknown>this.getFormDetails()
      job.requestId = this.editingCard.requestId;
      this.api.editJobRequest(job).subscribe( success => this.editReqSuccess(success), err => this.editReqFail(err));
      this.cancelEditing();
  }

  editReqSuccess(event){
    this.toast.display({type : "Success", heading : event.Title, message : event.message});
    this.getRequestCards();
  }
  editReqFail(event){
    this.toast.display({type : "Error", heading : event.error.Title, message : event.error.message + "\n" + event.message});
  }
}
