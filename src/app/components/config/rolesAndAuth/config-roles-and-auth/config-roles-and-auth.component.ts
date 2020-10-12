import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAddRoleComponent } from '../../modals/edit-add-role/edit-add-role.component';
import { EditAddJobComponent } from '../../modals/edit-add-job/edit-add-job.component';
import { EditAddViewAuthorizationComponent } from '../../modals/edit-add-view-authorization/edit-add-view-authorization.component';
import { ApiService } from 'src/app/services/api.service';
import { Role } from 'src/app/models/role';
import { ToastsService } from 'src/app/services/toasts.service';
import { Job } from 'src/app/models/job';
import { ViewAuth } from 'src/app/models/viewAuth';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-roles-and-auth',
  templateUrl: './config-roles-and-auth.component.html',
  styleUrls: ['./config-roles-and-auth.component.css']
})
export class ConfigRolesAndAuthComponent implements OnInit {

  roleControl : FormControl = new FormControl();
  jobControl : FormControl = new FormControl();
  authControl : FormControl = new FormControl();

  roles : Role [] = [];
  jobs : Job [] = [];
  viewAuth : ViewAuth [] = [];

  constructor(private modal: NgbModal, private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getRoles();
    this.getJobs();
    this.getViewAuths();
  }

  ///////////////////////// /////////////////////////  ROLES  /////////////////////////////////////////////////

  getRoles(){
    this.api.getRoles().subscribe( success => this.getRolesSuccess(success), error => this.getRolesFail(error));
  }
  getRolesSuccess(roles: Role[]){
    this.roles = roles;
  }
  getRolesFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  addRole(){
    const modalInstance = this.modal.open(EditAddRoleComponent);
    modalInstance.result.then((res)=>{
        this.getRoles();
    });
  }

  editRole(id : number){
    const modalInstance = this.modal.open(EditAddRoleComponent);
    let role = this.roles.find( x => x.roleId == id);
    modalInstance.componentInstance.editRole = role;
    modalInstance.result.then(res =>{

      this.getRoles();
    })

  }

  deleteRole(id : number){
    this.api.deleteRole(id).subscribe( suc => this.deleteSuccess(suc, id), err => this.deleteFail(err))
  }

  deleteSuccess(success, id){

   this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getRoles();
  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }



  /////////////////////////////////////////////////////// JOBS //////////////////////////////////////////////////////////////////////

  addJob(){
    const modalInstance = this.modal.open(EditAddJobComponent);
    modalInstance.result.then((res)=>{
        this.getJobs();
    });
  }

  editJob(id : number){
    const modalInstance = this.modal.open(EditAddJobComponent);
    let job = this.jobs.find( x => x.id == id );
    modalInstance.componentInstance.editJob = job;
    modalInstance.result.then( res =>{
        this.getJobs();
    });

    //console.log(this.jobs);
  }

  deleteJob(id : number){
    this.api.deleteJob(id).subscribe( suc => this.deleteJobSuccess(suc), err => this.deleteJobFail(err));
  }
  deleteJobSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getJobs();
  }
  deleteJobFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  getJobs(){
    this.api.getJobPositions().subscribe( success => this.getJobSuccess(success), err => this.getJobFail(err))
  }
  getJobSuccess(success){
    this.jobs = success;
  }
  getJobFail(failed){
    this.toast.display({type: "Error", heading : failed.error.Title, message : failed.error.message});
  }


  ////////////////////////////////////////////////////    VIEW AUTHORIZATION   ////////////////////////////////////

  getViewAuths(){
    this.api.getViewAuths().subscribe( succ => this.succGetViewAuth(succ), err => this.errGetViewAuth(err))
  }
  succGetViewAuth(succ){
    this.viewAuth = succ;
  }
  errGetViewAuth(err){
    this.toast.display({type: "Error", heading : err.error.Title, message : err.error.message});
  }

  createViewAuthorisation(){
    const modalInstance = this.modal.open(EditAddViewAuthorizationComponent);
    modalInstance.result.then((res)=>{
        this.getViewAuths();
    });
  }

  deleteViewAuthorisation(viewId : number, roleId: number){
    //console.log(viewAuth);
    this.api.deleteViewAuthorisation(viewId, roleId).subscribe( suc => this.deleteViewSuccess(suc), err => this.deleteViewFail(err));
  }

  deleteViewSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getViewAuths();
  }
  deleteViewFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

}
