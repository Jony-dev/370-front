import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Audit } from 'src/app/models/audit';
import { Database } from 'src/app/models/database';

@Component({
  selector: 'app-stage-report',
  host: {class:'full-component'},
  templateUrl: './stage-report.component.html',
  styleUrls: ['./stage-report.component.css']
})
export class StageReportComponent implements OnInit {

  audits : Audit[] = [];
  databaseTables : Database [] = [];

  startingDate : FormControl = new FormControl();
  endDate : FormControl = new FormControl();
  employeeSearch : FormControl = new FormControl();
  database : FormControl = new FormControl(null);


  constructor( private modal : NgbModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.getData();
  }

  getData(){

    this.getAudits();
    this.getDatabases();
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

  getDatabases(){
    this.api.getDatabaseTables().subscribe(x => this.databaseTables = x, er => this.getAuditFail(er));
  }
  clearFilter(){
    this.employeeSearch.setValue(null);
    this.startingDate.setValue(null);
    this.endDate.setValue(null);
  }

}

