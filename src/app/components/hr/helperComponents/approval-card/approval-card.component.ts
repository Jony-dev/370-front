import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobRequestDetailsComponent } from '../job-request-details/job-request-details.component';
import { GenerateJobCardComponent } from '../../modals/generate-job-card/generate-job-card.component';
import { JobRequestInfo } from 'src/app/models/jobReqDetails';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';


@Component({
  selector: 'app-approval-card',
  templateUrl: './approval-card.component.html',
  styleUrls: ['./approval-card.component.css']
})
export class ApprovalCardComponent implements OnInit {
  
  @Input() cardDetails : JobRequestInfo;
  @Output() event : EventEmitter<Boolean> = new EventEmitter;
  constructor( private modal :NgbModal, private jobHelper : JobCardHelperService) { }

  ngOnInit(): void {
  }

  openRequest(){
    const modalInstance = this.modal.open(GenerateJobCardComponent,  { windowClass : "hugeModal"});
    this.jobHelper.changeCard(this.cardDetails);
    console.log(this.cardDetails);
    modalInstance.componentInstance.requestDetails = this.cardDetails;
    modalInstance.result.then( () =>{
      this.event.emit(true);
    });
  }

}
