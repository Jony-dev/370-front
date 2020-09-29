import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateEmployee } from 'src/app/models/createEmployee';
import { Department } from 'src/app/models/department';
import { Job } from 'src/app/models/job';
import { Location } from 'src/app/models/location';
import { Schedule } from 'src/app/models/schedule';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-create-employee',
  host: {class:'full-component'},
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit, OnDestroy {

  routeSub : Subscription;
  routeId : number = null;
  userDetails : CreateEmployee;

  employementForm : FormGroup;

  locations : Location [] = [];
  schedule : Schedule [] = [];
  jobs : Job [] = [];
  departments : Department [] = [];

  constructor(private router : ActivatedRoute, private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.routeSub = this.router.params.subscribe( params => {this.routeId = params['id']});
    this.loadData();
    this.buildForm();
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  buildForm(){
    
    this.employementForm = this.formBuilder.group({
      jobId : [this.userDetails?.jobId, [Validators.required]],
      scheduleId : [this.userDetails?.scheduleId, [Validators.required]],
      salary : [this.userDetails?.salary, [Validators.required]],
      locationId : [this.userDetails?.locationId , [Validators.required]],
      email : [this.userDetails?.email, [Validators.required]],
      startDate : [this.userDetails?.startDate, [Validators.required]],
      endDate : [this.userDetails?.endDate, [Validators.required]],
      departmentId : [this.userDetails?.departmentId, [Validators.required]],
    })
  }
 

  loadError(er : any){
    this.toast.display({type : "Error", heading : er.error.Title, message : er.error.message});
  }

  loadData(){
    this.getUserDetails();
    this.getSchedule();
    this.getJobs();
    this.getLocation();
    this.getDepartments();
  }

  getUserDetails(){
    this.api.createEmployeeDetails(this.routeId).subscribe(x => 
      {
        this.userDetails = x;
        console.log(x);
        if(!this.userDetails.picture)
          this.userDetails.picture = "../../../../../assets/profile/empty.png";

        this.employementForm.setValue({
          jobId : this.userDetails.jobId,
          scheduleId : this.userDetails?.scheduleId,
          salary : this.userDetails?.salary,
          locationId : this.userDetails?.locationId,
          email : this.userDetails?.email,
          startDate : this.userDetails?.startDate,
          endDate : this.userDetails?.endDate,
          departmentId : this.userDetails?.departmentId,
        });
      },er => this.loadError(er) );
  }
  getJobs(){
    this.api.getJobPositions().subscribe( x => this.jobs = x, e => this.loadError(e));
  }

  getSchedule(){
    this.api.getSchedule().subscribe( x => this.schedule = x, e => this.loadError(e));
  }

  getDepartments(){
    this.api.getDepartments().subscribe( x => this.departments = x, e => this.loadError(e));
  }

  getLocation(){
    this.api.getLocations().subscribe(x => this.locations = x, e => this.loadError(e));
  }

  updateDetails(){
    let updateObj = this.employementForm.value;
    updateObj.userId = this.userDetails.userId;
    this.api.updateEmployeeAccount(updateObj).subscribe(x => this.toast.display({type : "Success", heading : (<any>x).Title, message : (<any>x).message}), e => this.loadError(e));
  }

  createEmploye(){
    let updateObj = this.employementForm.value;
    updateObj.userId = this.userDetails.userId;
    this.api.createEmployee(updateObj).subscribe(x => this.toast.display({type : "Success", heading : (<any>x).Title, message : (<any>x).message}), e => this.loadError(e));
  }

  uploadFile(file){
    let formData = new FormData();
    formData.append("contract",file.target.file);
    
  }
}
