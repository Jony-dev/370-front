import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApplicantPoolCard } from 'src/app/models/applicantPool';
import { userCard } from 'src/app/models/userCard';
import { CreateInterviewComponent } from '../../modals/create-interview/create-interview.component';
import { ViewApplicationComponent } from '../../modals/view-application/view-application.component';

@Component({
  selector: 'app-applicant-pool-card',
  templateUrl: './applicant-pool-card.component.html',
  styleUrls: ['./applicant-pool-card.component.css']
})
export class ApplicantPoolCardComponent implements OnInit {

  @Input() cardDetails : ApplicantPoolCard;

  @Output() changePool : EventEmitter<any> = new EventEmitter<any>();
  constructor( private modal : NgbModal) { }

  ngOnInit(): void {
  }

  createInterview(){
    const modalInstance = this.modal.open(CreateInterviewComponent,{ windowClass : "largeModal"});
    console.log(this.cardDetails);
    modalInstance.componentInstance.applicant = this.cardDetails;
  }

  viewApplication(){
    const modalInstance = this.modal.open(ViewApplicationComponent,{ windowClass : "hugeModal"});
  }

  moveDisqualify(){
    let obj = { applicationId : this.cardDetails.applicationId, to : "disqualify"};
    this.changePool.emit(obj);
  }

  moveShortList(){
    let obj = { applicationId : this.cardDetails.applicationId, to : "shortList"};
    this.changePool.emit(obj);
  }

  moveUndecided(){
    let obj = { applicationId : this.cardDetails.applicationId, to : "undecided"};
    this.changePool.emit(obj);
  }

}
