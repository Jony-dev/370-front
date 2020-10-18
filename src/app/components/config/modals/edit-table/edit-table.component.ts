import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Department } from 'src/app/models/department';
import { Division } from 'src/app/models/division';
import { Tafel } from 'src/app/models/tafel';
import { TableType } from 'src/app/models/tableType';
import { Toast } from 'src/app/models/toast';
import { Building } from 'src/app/models/building';
import { Floor } from 'src/app/models/floor';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.css']
})
export class EditTableComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editTable  : Tafel = null;

  tableTypes: TableType[] =[];
  buildings: Building[] =[];
  floors: Floor[] =[];

  tableForm : FormGroup;

  ngOnInit(): void {
    console.log(this.editTable);
    this.getData();
    this.buildForm();

    if(this.editTable)
    {
      this.tableForm.get('name').setValue(this.editTable.name);
      this.tableForm.get('ttypeId').setValue(this.editTable.ttypeId);
      this.tableForm.get('buildingId').setValue(this.editTable.buildingId);
      this.tableForm.get('floorId').setValue(this.editTable.floorId);
    }
  }

  getData(){
    this.getTableTypes();
    this.getBuildings();
    this.getFloors();
  }
  getTableTypes(){
    this.api.getTableTypes().subscribe( succ => this.retTableSucc(succ), err => this.retTableErr(err))

  }
  retTableSucc(succ){
    this.tableTypes = succ;
  }
  retTableErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  getBuildings(){
    this.api.getBuildings().subscribe( succ => this.retBuildingSucc(succ), err => this.retBuildingErr(err))

  }
  retBuildingSucc(succ){
    this.buildings = succ;
  }
  retBuildingErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  getFloors(){
    this.api.getFloors().subscribe( succ => this.retFloorSucc(succ), err => this.retFloorErr(err))
  }
  retFloorSucc(succ){
    this.floors = succ;
  }
  retFloorErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  buildForm(){
    this.tableForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      ttypeId : [null,[Validators.required]],
      buildingId : [null, [Validators.required]],
      floorId : [null, [Validators.required]],
    });
  }

  getFormDetails(){
    return {
      name: this.tableForm.get('name').value,
      ttypeId: this.tableForm.get('ttypeId').value,
      buildingId: this.tableForm.get('buildingId').value,
      floorId: this.tableForm.get('floorId').value,
    }
  }

  save(){
    //let tableObj : Tafel = <Tafel>this.getFormDetails();
    let tableObj : any = this.getFormDetails();
    if(!this.editTable)
      this.api.addTable(tableObj).subscribe( success => this.addTableSuccess(success),error => this.addTableFailed(error));
    else{
      tableObj.id = this.editTable.id;
      console.log(tableObj);
      this.api.editTable(tableObj).subscribe( success => this.editTableSuccess(success),error => this.editTableFailed(error));
     }
  }


  addTableSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addTableFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editTableSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  editTableFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }



}
