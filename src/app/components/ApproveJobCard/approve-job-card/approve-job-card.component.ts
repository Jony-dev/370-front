import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MyApprovers } from 'src/app/models/myApprovers';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RejectCardComponent } from '../modals/reject-card/reject-card.component';
import { Subscription } from 'rxjs';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';

@Component({
  selector: 'app-approve-job-card',
  templateUrl: './approve-job-card.component.html',
  styleUrls: ['./approve-job-card.component.css']
})
export class ApproveJobCardComponent implements OnInit, OnDestroy {

  myApprovals : MyApprovers [] = [];
  viewCard : number  = null;
  refresher : Subscription;
  constructor(private api : ApiService, private toast : ToastsService, private modal : NgbModal, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.getMyApprovals();
    this.refresher = this.helper.shouldRefresh$.subscribe( succ => this.getMyApprovals());
  }

  ngOnDestroy(){
    this.refresher.unsubscribe();
  }

  getMyApprovals(){
    this.viewCard = null;
    this.api.getMyApprovals().subscribe(suc => this.gotApprovers(suc), err => this.errDisplay(err));
  }

  gotApprovers(approvers : MyApprovers []){
    this.myApprovals = approvers;
  }

  errDisplay(err){
    this.toast.display({type : "Error", heading : err.error.Title, message : err.error.message});
  }

  viewApproval(cardId : number){
    this.viewCard = cardId;
  }

  reject(){
    const modalInstance = this.modal.open(RejectCardComponent);
    modalInstance.componentInstance.cardId = this.viewCard;
}
  approve(){
    this.api.approveJobCard(this.viewCard).subscribe( succ => this.approveSuccess(), err => this.errDisplay(err));
    this.toast.display({type : "Success", heading : "Successfully Approved", message : "The job card was successfully approved"});
  }
  approveSuccess(){
    this.helper.emitRefresh();
    this.viewCard = null;
  }
}
