import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/models/toast';
import { Location } from '../../../../models/location';
import { Country } from 'src/app/models/country';

@Component({
  selector: 'app-edit-add-location',
  templateUrl: './edit-add-location.component.html',
  styleUrls: ['./edit-add-location.component.css']
})
export class EditAddLocationComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder ) { }

  @Input() editLocation : Location = null;
  // @Input() countryId : string= null;
  countries: Country[] = [];
  //views : View[] = [];
  locationForm:FormGroup
  ngOnInit(): void {

    this.getData();
    this.buildForm();

    if(this.editLocation){
      this.locationForm.get('countryId').setValue(this.editLocation.countryId);
      this.locationForm.get('location').setValue(this.editLocation.name);
    }

  }

  getData(){
    this.getCountries();
  }
  getCountries(){
    this.api.getCountries().subscribe( succ => this.retCountriesSucc(succ), err => this.retCountriesErr(err))

  }
  retCountriesSucc(succ){
    this.countries = succ;
  }
  retCountriesErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }


  buildForm(){
    this.locationForm = this.formBuilder.group({
      countryId : [null,[Validators.required]],
      location : ['',[Validators.required]]
    });

  }
  getFormDetails(){

    return {
      countryId : this.locationForm.get('countryId').value,
      name : this.locationForm.get('location').value,
    }

  }
  save(){

    let locationObj : Location = <Location>this.getFormDetails();
    if(!this.editLocation)
      this.api.addLocation(locationObj).subscribe( success => this.addLocationSuccess(success),error => this.addLocationFailed(error));
    else{
      locationObj.locationId = this.editLocation.locationId;
      this.api.editLocation(locationObj).subscribe( success => this.editLocationSuccess(success),error => this.editLocationFailed(error));
    }

  }

  addLocationSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addLocationFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editLocationSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  editLocationFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get countryId(){
    return this.locationForm.get("countryId");

  }

  get location(){

    return this.locationForm.get("location");
  }

}
