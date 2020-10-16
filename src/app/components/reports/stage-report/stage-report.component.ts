import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Audit } from 'src/app/models/audit';

@Component({
  selector: 'app-stage-report',
  host: {class:'full-component'},
  templateUrl: './stage-report.component.html',
  styleUrls: ['./stage-report.component.css']
})
export class StageReportComponent implements OnInit {

  audit : Audit[] = [];

  constructor( private modal : NgbModal, private toast : ToastsService, private api : ApiService) { }

  ngOnInit(): void {

    this.getData();
  }

  getData(){

    this.getAudits();
  }

  getAudits(){
    this.api.getAudits().subscribe( success => this.getAuditSuccess(success), error => this.getAuditFail(error));
  }
  //success
  getAuditSuccess(success){
    this.audit = success;
    console.log(success);
  }
  //fail
  getAuditFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

}

