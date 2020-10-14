import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseTable } from 'src/app/models/databaseTable';

@Component({
  selector: 'app-database',
  host: {class:'full-component'},
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  dataBaseTable : DatabaseTable[] = [];

  constructor(  private modal : NgbModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {

    this.getData();
  }

  getData(){

    this.getRecords();
  }

  getRecords(){

    this.api.getRecords().subscribe( success => this.getRecordSuccess(success), error => this.getRecordFail(error));
  }
  //success
  getRecordSuccess(success){

    this.dataBaseTable = success;
    console.log(this.dataBaseTable);
  }
  //fail
  getRecordFail(error){

    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
    console.log(this.dataBaseTable);
  }


}
