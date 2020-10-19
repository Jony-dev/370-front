import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditTableComponent } from '../../modals/edit-table/edit-table.component';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tafel } from 'src/app/models/tafel';
import {Building} from 'src/app/models/building';
import {Floor} from 'src/app/models/floor';
import { TableType } from 'src/app/models/tableType';
import { FilterFloor } from 'src/app/components/system/pipes/filterFloor.pipe';
import { SlotSetup } from 'src/app/models/slotSetup';
import { Date } from 'src/app/models/date';

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
  searchText : string;
  requestDetails : Building;

  slotSetup : FormGroup;

  tableForm:FormGroup;
  addTableForm:FormGroup;
  bookableDates : Date [] = [];
  bookableControls : FormArray = new FormArray([]);

  sControl : FormControl = new FormControl();
  eControl : FormControl = new FormControl();

  ngOnInit(): void {
    this.getData();
    this.buildForm();
  }

  getData(){
    this.getTables();
    this.getTableTypes();
    this.getBuildings();
    this.getFloors();
    this.getSlotSetup();
    this.getDates();

  }

  buildForm(){
    this.tableForm = this.formBuilder.group({
      tableSearch: ["",[Validators.required]],
      ttypeId : [null,[Validators.required]],
      buildingId : [null,[Validators.required]],
      floorId : [null,[Validators.required]],

    });

    this.addTableForm = this.formBuilder.group({
      name : ["", [Validators.required]],
      ttypeId : [null,[Validators.required]],
      buildingId : [null,[Validators.required]],
      floorId : [null,[Validators.required]],
    });

    this.slotSetup = this.formBuilder.group({
      startTime : [null, [Validators.required]],
      endTime : [null, [Validators.required]],
      numSlots : [null, [Validators.required]]
    })

  }

  addTable(){
    let table = this.addTableForm.value;
  }

  editTable(id : number){
    const modalInstance = this.modal.open(EditTableComponent);
    
    let table = this.tables.find( x => x.id == id);
    modalInstance.componentInstance.editTable = table;
    modalInstance.result.then(res =>{
      this.getTables();
    });
  }
  getTables(){
    this.api.getTables().subscribe( success => this.getTableSuccess(success), error => this.getTableFail(error))
  }

  getTableSuccess(success){ //why does table pass []
    this.tables = success;
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
    this.floors = succ;
  }
  retFloorsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  /////////TableType//////
  getTableTypes(){
    this.api.getTableTypes().subscribe( succ => this.retTableTypeSucc(succ), err => this.retTableTypeErr(err))

  }
  retTableTypeSucc(succ){
    this.tableTypes = succ;
  }
  retTableTypeErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  //////////////////////////////////Pipe //////////////////////////////////////////
  getFloorsByPipe(){
    this.api.getFloors().subscribe( success => this.gotFloors(success), err => this.fetchFailed)
  }

  gotFloors(success){
    //this.floors = success;
    //this.approvers.push(this.employees.find(x => x.id == this.requestDetails.user.id));
    //this.floors = this.floors.filter( x => x.floorId == this.requestDetails.buildingId);
    this.floors = success;
  }
  fetchFailed(error){
    this.toast.display({type:"Error",heading: error.error.Title, message : error.error.message});
  }

  ////////////////////////////////////////////////////////////////
  getSlotSetup(){
    this.api.getSlotInformation().subscribe(x => {
      this.slotSetup.setValue({
        startTime : x.startTime,
        endTime : x.endTime,
        numSlots : x.numSlots
      });
    },
    er =>{
      this.retTableTypeErr(er);
    });

  }
  getDates(){
    this.api.getDates().subscribe(x => {
      
      this.bookableDates = x;
      console.log(this.bookableDates);
      this.bookableDates.forEach(el => this.bookableControls.push(new FormControl(el.bookable)));
    })
  }

  changeDate(val : boolean, dateId : number){
    this.api.changeDateVal(dateId,val).subscribe(x =>{}, er => this.retFloorsErr(er));
  }









}
