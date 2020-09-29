import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduledInterview } from 'src/app/models/scheduledInterview';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-interview',
  host: {class:'full-component'},
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.css']
})
export class InterviewComponent implements OnInit {

  interview : ScheduledInterview = null;
  interviewForm : FormGroup  = null;
  constructor(private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.buildForm();
  
  }
  rateInterview(interview : ScheduledInterview){
    this.interview = interview;
  }

  buildForm(){
    this.interviewForm = this.formBuilder.group({
      rating : [null, [Validators.required]],
      comment : [ null,[Validators.required]]
    })
  }

  getFormDetails(){

     return {
      interviewId : this.interview.interviewId,
      rating : this.interviewForm.get('rating').value,
      comment : this.interviewForm.get('comment').value
    }
  }

  makeRating(){

    let rating = this.getFormDetails();
    this.api.makeRating(rating).subscribe( 
      res => 
      {
        this.toast.display({type : "Error", heading : (<any>res).Title, message : (<any>res).message});
        this.helper.emitRefresh();
        this.interview = null;
        this.interviewForm.reset();
      },
      err => this.errorFail(err))
  }

  errorFail(err){
    this.toast.display({type : "Error", heading : err.error.Title, message : err.error.message});
  }
 

}
