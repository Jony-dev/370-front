import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateEmployee } from 'src/app/models/createEmployee';
import { Department } from 'src/app/models/department';
import { Job } from 'src/app/models/job';
import { Schedule } from 'src/app/models/schedule';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Location } from 'src/app/models/location';

@Component({
  selector: 'app-user-account',
  host: {class:'full-component'},
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {

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
    console.log(this.routeId);
    this.loadData();
    this.buildForm();
  }

  ngOnDestroy(){
    this.routeSub.unsubscribe();
  }

  buildForm(){
    
    this.employementForm = this.formBuilder.group({
      jobId : [this.userDetails? this.userDetails.jobId : null, [Validators.required]],
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
    this.getSchedule();
    this.getJobs();
    this.getLocation();
    this.getDepartments();
    this.getUserDetails();
  }

  getUserDetails(){
    this.api.getUserDetails(this.routeId).subscribe(x => 
      {
        this.userDetails = x;
        if(!this.userDetails.picture)
          this.userDetails.picture = "../../../../../assets/profile/empty.png";

        this.employementForm.setValue({
          jobId : this.userDetails?.jobId ? this.userDetails?.jobId : null,
          scheduleId : this.userDetails?.scheduleId ? this.userDetails?.scheduleId : null,
          salary : this.userDetails?.salary ? this.userDetails?.salary : 0,
          locationId : this.userDetails?.locationId ? this.userDetails?.locationId : null,
          email : this.userDetails?.email ? this.userDetails?.email : "",
          startDate : this.userDetails?.startDate ? this.userDetails?.startDate : null,
          endDate : this.userDetails?.endDate ? this.userDetails?.endDate : null,
          departmentId : this.userDetails?.departmentId ? this.userDetails?.departmentId : null,
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
