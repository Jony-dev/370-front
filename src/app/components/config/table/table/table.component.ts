import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTableComponent } from '../../modals/edit-table/edit-table.component';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tafel } from 'src/app/models/tafel';
import {Building} from 'src/app/models/building';
import {Floor} from 'src/app/models/floor';
import { TableType } from 'src/app/models/tableType';

@Component({
  selector: 'app-table',
  host : { class : 'full-component'},
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor( private modal : NgbModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  tables : Tafel [] = [];
  buildings : Building[] = [];
  floors : Floor[] = [];
  tableTypes : TableType[] = [];

  tableForm:FormGroup;


  ngOnInit(): void {
    this.getData();
    this.buildForm();
  }

  getData(){
    this.getTableTypes();
    this.getBuildings();
    this.getFloors();
  }

  buildForm(){
    this.tableForm = this.formBuilder.group({
      ttypeId : [null,[Validators.required]],
      buildingId : [null,[Validators.required]],
      floorId : [null,[Validators.required]],

    });
  }

  addTable(){
    const modalInstance = this.modal.open(EditTableComponent);
    modalInstance.result.then((res)=>{
      this.getTables();
    });
  }

  getTables(){
    this.api.getTables().subscribe( success => this.getTableSuccess(success), error => this.getTableFail(error))
  }

  getTableSuccess(tafels: Tafel[]){
    this.tables = tafels;
  }
  //fail
  getTableFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }
  deleteTable(id : number){
    this.api.deleteTable(id).subscribe( suc => this.deleteSuccess(suc), err => this.deleteFail(err))
  }
  deleteSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getTables();
  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  editTable(id : number){
    const modalInstance = this.modal.open(EditTableComponent);
    console.log(this.tables);
    let table = this.tables.find( x => x.id == id);
    //let location = this.locations.find( x => x.name == lo);
    modalInstance.componentInstance.editTable = table;
    modalInstance.result.then(res =>{
      this.getTables();
    });
   // console.log(this.tables);
  }

  ////////////////Building//////////////////////
  getBuildings(){
    this.api.getBuildings().subscribe( succ => this.retBuildingsSucc(succ), err => this.retBuildingsErr(err))

  }
  retBuildingsSucc(succ){
    this.buildings = succ;
  }
  retBuildingsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  ///Floor
  getFloors(){
    this.api.getFloors().subscribe( succ => this.retFloorsSucc(succ), err => this.retFloorsErr(err))

  }
  retFloorsSucc(succ){
    this.buildings = succ;
  }
  retFloorsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  /////////TableType//////
  getTableTypes(){
    this.api.getTableTypes().subscribe( succ => this.retTableTypeSucc(succ), err => this.retTableTypeErr(err))

  }
  retTableTypeSucc(succ){
    this.buildings = succ;
  }
  retTableTypeErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }






}
