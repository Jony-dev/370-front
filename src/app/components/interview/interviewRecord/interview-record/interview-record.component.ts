import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ScheduledInterview } from 'src/app/models/scheduledInterview';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-interview-record',
  templateUrl: './interview-record.component.html',
  styleUrls: ['./interview-record.component.css']
})
export class InterviewRecordComponent implements OnInit, OnDestroy {

  dataSub : Subscription;

  @Output() rateApplication = new EventEmitter<ScheduledInterview>();

  myInterviews : ScheduledInterview [] = [];
  constructor(private toast : ToastsService, private api : ApiService, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.loadData();
    this.dataSub = this.helper.shouldRefresh$.subscribe( succ => this.loadData());
  }
  ngOnDestroy(){
    this.dataSub.unsubscribe();
  }

  loadData(){
    this.getInterviews();
  }

  getInterviews(){
    this.api.getMyInterviews().subscribe( res => this.gotInterviews(res), err => this.failed(err))
  }
  failed(e){
    this.toast.display({type : "Error", heading : e.error.Title, message : e.error.message});
  }

  gotInterviews(res){
    this.myInterviews = res;
    console.log(res);
  }

  rate(id : number){
    this.rateApplication.emit(this.myInterviews.find(x => x.interviewId == id ));
  }
}
