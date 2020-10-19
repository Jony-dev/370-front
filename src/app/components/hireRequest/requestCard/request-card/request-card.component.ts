import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobReqCard } from 'src/app/models/jobReqCard';

@Component({
  selector: 'app-request-card',
  templateUrl: './request-card.component.html',
  styleUrls: ['./request-card.component.css']
})
export class RequestCardComponent implements OnInit {

  @Input() cardDetails : JobReqCard = null;
  
  @Output() editRequest = new EventEmitter<JobReqCard>();
  @Output() deleteReq = new EventEmitter<JobReqCard>();
  constructor() { }

  ngOnInit(): void {
  }

  outputRequest(){
    this.editRequest.emit(this.cardDetails);
  }

  deleteRequest(){
    this.deleteReq.emit(this.cardDetails);
  }

}
