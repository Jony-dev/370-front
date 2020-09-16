import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { JobApplicationComponent } from '../jobApplication/job-application/job-application.component';

@Component({
  selector: 'app-job-application-view',
  host: {class:'full-component'},
  templateUrl: './job-application-view.component.html',
  styleUrls: ['./job-application-view.component.css']
})
export class JobApplicationViewComponent implements OnInit {

  constructor( private modal : NgbModal, private router : ActivatedRoute) { }
  routSub : Subscription;
  cardId : number = null;
  ngOnInit(): void {
    this.routSub = this.router.params.subscribe( param => {this.cardId = +param['id']})
  }
  jobApply(){
    const modalInstance = this.modal.open(JobApplicationComponent,{windowClass:"hugeModal"});
    modalInstance.componentInstance.cardId = this.cardId;
  }

}
