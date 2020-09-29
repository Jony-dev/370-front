import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Floor } from 'src/app/models/floor';
import { Building } from 'src/app/models/building';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-floor',
  templateUrl: './edit-add-floor.component.html',
  styleUrls: ['./edit-add-floor.component.css']
})
export class EditAddFloorComponent implements OnInit {

  constructor( public activeModal : NgbActiveModal,  private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editFloor : Floor = null;
  buildings: Building[] = [];
  //views : View[] = [];
  floorForm:FormGroup;

  ngOnInit(): void {
    this.getData();
    this.buildForm();

    if(this.editFloor){
      this.floorForm.get('buildingId').setValue(this.editFloor.buildingId);
      this.floorForm.get('floorNumber').setValue(this.editFloor.floorNumber);
    }
  }

  getData(){
    this.getDeletedBuildings();
  }
  getDeletedBuildings(){
    this.api.getDeletedBuildings().subscribe( succ => this.retBuildingsSucc(succ), err => this.retBuildingsErr(err))

  }
  retBuildingsSucc(succ){
    this.buildings = succ;
  }
  retBuildingsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  buildForm(){
    this.floorForm = this.formBuilder.group({
      buildingId : [null,[Validators.required]],
      floorNumber : ['',[Validators.required]],

    });

  }
  getFormDetails(){

    return {
      buildingId : this.floorForm.get('buildingId').value,
      floorNumber : this.floorForm.get('floorNumber').value,
    }

  }

  save(){

    let floorObj : Floor = <Floor>this.getFormDetails();
    if(!this.editFloor)
      this.api.addFloor(floorObj).subscribe( success => this.addFloorSuccess(success),error => this.addFloorFailed(error));
    else{
      floorObj.floorId = this.editFloor.floorId;
      this.api.editFloor(floorObj).subscribe( success => this.editFloorSuccess(success),error => this.editFloorFailed(error));
    }

  }

  addFloorSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addFloorFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editFloorSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  editFloorFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get buildingId(){
     return this.floorForm.get("buildingId");
  }

  get floorNumber(){

    return this.floorForm.get("floorNumber");
  }

}
