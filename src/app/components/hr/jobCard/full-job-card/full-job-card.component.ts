import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InterviewOverviewComponent } from '../../modals/interview-overview/interview-overview.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserApprover } from 'src/app/models/userApprover';

@Component({
  selector: 'app-full-job-card',
  host: {class:'full-component'},
  templateUrl: './full-job-card.component.html',
  styleUrls: ['./full-job-card.component.css']
})
export class FullJobCardComponent implements OnInit, OnDestroy {

  private routeSub : Subscription;
  routeId : number;
  approvers : UserApprover [] = [];

  constructor( private modal : NgbModal, private api : ApiService, private toast : ToastsService, private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub =  this.router.params.subscribe( params => {this.routeId = params['id']; console.log(this.routeId)});
    this.loadData();
  }

  loadData(){
    this.getApproverList();
  }
  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  openOverallInterview(){
    const modalInstance = this.modal.open(InterviewOverviewComponent, {windowClass :"largeModal"});
  }

  getApproverList(){
    this.api.getCardApproverList(this.routeId).subscribe( succ => this.getApproversSuccess(succ), err => this.loadError(err));
  }

  loadError(error){
    this.toast.display({type : "Error", heading : error.error.Title, message : error.error.message});
  }
  getApproversSuccess(success : UserApprover []){
    this.approvers = success;
    console.log(success);
  }

  editCard(){
    
  }

}
