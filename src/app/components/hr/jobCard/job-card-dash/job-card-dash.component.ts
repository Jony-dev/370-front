import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobRequestInfo } from 'src/app/models/jobReqDetails';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { Subscription } from 'rxjs';
import { MyWorkingCards } from 'src/app/models/myWorkingCards';

@Component({
  selector: 'app-job-card-dash',
  host: {class:'full-component'},
  templateUrl: './job-card-dash.component.html',
  styleUrls: ['./job-card-dash.component.css']
})
export class JobCardDashComponent implements OnInit, OnDestroy {

  mediator : Subscription;
  assignedCards : JobRequestInfo [] = [];
  workingCards : MyWorkingCards [] = [];
  constructor(private api : ApiService, private toast : ToastsService, private helper : JobCardHelperService){}


  ngOnInit(){
    this.loadData();
    this.mediator = this.helper.shouldRefresh$.subscribe( success => this.loadData())
  }
  ngOnDestroy(){
    this.mediator.unsubscribe();
  }

 loadData(){
  this.getAssignedCards();
  this.getWorkingCards();

 }

 getAssignedCards(){
   this.api.getAssignedJobCards().subscribe( succ => this.retCardSuccess(succ), err => this.retCardFail(err));
 }
 retCardSuccess(success){
    this.assignedCards = success;
    console.log(success);
 }

 retCardFail(error){
   this.toast.display({type : "Error", heading : error.error?.Title, message : error.error.message + "\n" + error.message});
 }

 getWorkingCards(){
   this.api.getMyWorkingCards().subscribe( success => this.gotWorkingCards(success), err => this.retCardFail(err) )
 }

 gotWorkingCards( cards : MyWorkingCards []){
  this.workingCards = cards;
 }
}
