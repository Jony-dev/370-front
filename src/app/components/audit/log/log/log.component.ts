import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Audit } from 'src/app/models/audit';

@Component({
  selector: 'app-log',
  host: {class:'full-component'},
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  audits : Audit[] = [];

  constructor( private modal : NgbModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

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
    this.audits = success;
  }
  //fail
  getAuditFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

}
