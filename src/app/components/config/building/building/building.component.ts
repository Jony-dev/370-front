import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAddLocationComponent } from '../../modals/edit-add-location/edit-add-location.component';
import { EditAddBuildingComponent } from '../../modals/edit-add-building/edit-add-building.component';
import { EditAddFloorComponent } from '../../modals/edit-add-floor/edit-add-floor.component';
import { Location } from 'src/app/models/location';
import { Building } from 'src/app/models/building';
import { Floor } from 'src/app/models/floor';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-building',
  host: {class:'full-component'},
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.css']
})
export class BuildingComponent implements OnInit {
  locations : Location [] = [];
  buildings : Building [] = [];
  floors : Floor [] = [];

  buildingControl : FormControl = new FormControl();
  floorControl : FormControl = new FormControl();
  locationControl : FormControl = new FormControl();
  
  constructor(private modal: NgbModal,  private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){

    this.getLocations();
    this.getBuildings();
    this.getFloors();

  }

  addLocation(){
    const modalInstance = this.modal.open(EditAddLocationComponent);
    modalInstance.result.then((res)=>{
      this.getLocations();

    });

  }


  editLocation(locationid : number){
    console.log(this.locations);
    const modalInstance = this.modal.open(EditAddLocationComponent);
    let location = this.locations.find( x => x.locationId == locationid);
    //let location = this.locations.find( x => x.name == lo);
    modalInstance.componentInstance.editLocation = location;
    modalInstance.result.then(res =>{

      this.getLocations();
    })
    console.log(this.locations);
  }
  getLocations(){
  this.api.getLocations().subscribe( success => this.getLocationSuccess(success), error => this.getLocationFail(error))
  }
  //success
  getLocationSuccess(locations: Location[]){
    console.log(locations);
    this.locations = locations;
  }
  //fail
  getLocationFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }
  // delete Location

  deleteLocation(id : number){
    this.api.deleteLocation(id).subscribe( suc => this.deleteSuccess(suc, id), err => this.deleteFail(err))
  }

  deleteSuccess(success, id){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getLocations();
  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }


  ////////////Building ///////////
  getBuildings(){
    this.api.getBuildings().subscribe( success => this.getBuildingSuccess(success), error => this.getBuildingFail(error))
  }
  //success
  getBuildingSuccess(buildings: Building[]){
    console.log(buildings);
    this.buildings = buildings;
  }
  //fail
  getBuildingFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }
  addBuilding(){
    const modalInstance = this.modal.open(EditAddBuildingComponent);
    modalInstance.result.then((res)=>{
      this.getBuildings();

    });
  }

  editBuilding(buildingid : number){
    console.log(this.buildings);
    const modalInstance = this.modal.open(EditAddBuildingComponent);
    let building = this.buildings.find( x => x.buildingId == buildingid);
    //let location = this.locations.find( x => x.name == lo);
    modalInstance.componentInstance.editBuilding = building;
    modalInstance.result.then(res =>{

      this.getBuildings();
    })
    console.log(this.buildings);
  }

  deleteBuilding(buildingId : number){
    this.api.deleteBuilding(buildingId).subscribe( suc => this.deleteSuccessBuild(suc, buildingId), err => this.deleteFailBuild(err))
  }

  deleteSuccessBuild(success, buildingId){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getBuildings();
  }
  deleteFailBuild(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  getBuildingsByLocation(locationId: number){
    //move this into the ts
  }

  /////////Floor/////////////

  addFloor(){
    const modalInstance = this.modal.open(EditAddFloorComponent);
    modalInstance.result.then((res)=>{
      this.getFloors();

    });
  }

  getFloors(){
    this.api.getFloors().subscribe( success => this.getFloorSuccess(success), error => this.getFloorFail(error))
  }
  //success
  getFloorSuccess(floors: Floor[]){
    console.log(floors);

    this.floors = floors;
  }
  //fail
  getFloorFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }


  editFloor(floorId : number){
    console.log(this.floors);
    const modalInstance = this.modal.open(EditAddFloorComponent);
    let floor = this.floors.find( x => x.floorId == floorId);
    //let location = this.locations.find( x => x.name == lo);
    modalInstance.componentInstance.editFloor = floor;
    modalInstance.result.then(res =>{

      this.getFloors();
    })
    console.log(this.floors);
  }


  getFloorsByBuilding(buildingId: number){

  }
  deleteFloor(floorId : number){
    this.api.deleteFloor(floorId).subscribe( suc => this.deleteSuccessFloor(suc, floorId), err => this.deleteFailFloor(err))
  }

  deleteSuccessFloor(success, floorId){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getFloors();
  }
  deleteFailFloor(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

}
