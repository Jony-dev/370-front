import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Building } from 'src/app/models/building';
import { Location } from 'src/app/models/location';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-building',
  templateUrl: './edit-add-building.component.html',
  styleUrls: ['./edit-add-building.component.css']
})
export class EditAddBuildingComponent implements OnInit {

  constructor( public activeModal : NgbActiveModal,  private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }
  @Input() editBuilding : Building = null;
  locations: Location[] = [];
  //views : View[] = [];
  buildingForm:FormGroup;

  ngOnInit(): void {

    this.getData();
    this.buildForm();

    if(this.editBuilding){
      this.buildingForm.get('locationId').setValue(this.editBuilding.locationId);
      this.buildingForm.get('name').setValue(this.editBuilding.name);
    }
  }

  getData(){
    this.getDeletedLocations();
  }
  getDeletedLocations(){
    this.api.getDeletedLocations().subscribe( succ => this.retLocationSucc(succ), err => this.retLocationsErr(err))

  }
  retLocationSucc(succ){
    this.locations = succ;
  }
  retLocationsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  buildForm(){
    this.buildingForm = this.formBuilder.group({
      locationId : [null,[Validators.required]],
      name : ['',[Validators.required]]
    });

  }
  getFormDetails(){

    return {
      locationId : this.buildingForm.get('locationId').value,
      name : this.buildingForm.get('name').value,
    }

  }

  save(){

    let buildingObj : Building = <Building>this.getFormDetails();
    if(!this.editBuilding)
      this.api.addBuilding(buildingObj).subscribe( success => this.addBuildingSuccess(success),error => this.addBuildingFailed(error));
    else{
      buildingObj.buildingId = this.editBuilding.buildingId;
      this.api.editBuilding(buildingObj).subscribe( success => this.editBuildingSuccess(success),error => this.editBUildingFailed(error));
    }

  }

  addBuildingSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addBuildingFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editBuildingSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  editBUildingFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get LocationId(){

    return this.buildingForm.get("locationId");
  }

  get name(){

    return this.buildingForm.get("name");
  }



}
