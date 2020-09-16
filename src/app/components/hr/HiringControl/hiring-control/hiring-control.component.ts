import { Component, OnInit, OnDestroy } from '@angular/core';
import { JobRequestInfo } from 'src/app/models/jobReqDetails';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hiring-control',
  host: {class:'full-component'},
  templateUrl: './hiring-control.component.html',
  styleUrls: ['./hiring-control.component.css']
})
export class HiringControlComponent implements OnInit, OnDestroy {

  jobRequests : JobRequestInfo [] = [];
  constructor( private api : ApiService, private toasts : ToastsService, private jobHelper : JobCardHelperService) { }
  refresher : Subscription;
  ngOnInit(): void {
    this.getData();
    this.refresher = this.jobHelper.shouldRefresh$.subscribe( success => this.updateRequests(success))
  }
  ngOnDestroy(){
    this.refresher.unsubscribe();
  }

  getData(){
    this.getRequests();
  }

  getRequests(){
    this.api.getJobRequests().subscribe( success => this.retRequestsSuccess(success), err => this.reRequestsFail(err))
  }

  retRequestsSuccess(success){
    console.log(success);
    this.jobRequests = success;
  }

  reRequestsFail(err){
    this.toasts.display({type : "Error", heading : err.error.Title, message : err.error.message});
  }

  updateRequests(event){
    this.getRequests();
  }

}
