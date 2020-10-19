import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Team } from 'src/app/models/team';
import { TeamMembers } from 'src/app/models/teamMembers';
import { Toast } from 'src/app/models/toast';
import { Department } from 'src/app/models/department';
import { User } from 'src/app/models/user';
import { DepartmentsMembers } from 'src/app/models/departmentsMembers';
import { AddTeamMemberComponent } from '../add-team-member/add-team-member.component';

@Component({
  selector: 'app-edit-add-team',
  templateUrl: './edit-add-team.component.html',
  styleUrls: ['./edit-add-team.component.css']
})
export class EditAddTeamComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder) { }
  @Input() editTeam : Team = null;
  @Input() addMember = false;
  @Input() editing = false;

  searchControl : FormControl = new FormControl();
  
  teams : Team [] = [];
  teamMembers : TeamMembers [] = [];

  departments : Department [] = [];
  users : User [] = [];
  departmentsMembers : DepartmentsMembers [] = [];

  teamForm : FormGroup;

  ngOnInit(): void {
    this.getData();
    this.buildForm();

    if(this.editTeam){
      console.log('if edit works');
        this.teamForm.get('name').setValue(this.editTeam.name);
        this.teamForm.get('departmentId').setValue(this.editTeam.departmentId);
        this.teamForm.get('description').setValue(this.editTeam.description);
      }
  }

  getData(){

    this.getTeams();
    this.getDepartmentsMembers();
    this.getDepartments();
  }


  getDepartments()
  {
    this.api.getDepartments().subscribe( success => this.getDepartmenSuccess(success), error => this.getDepartmentFail(error))
  }
  //success
  getDepartmenSuccess(success){
    this.departments = success;
  }
  //fail
  getDepartmentFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  getTeams()
  {
    this.api.getTeamCards().subscribe( success => this.getTeamSuccess(success), error => this.getTeamFail(error));
  }
  //success
  getTeamSuccess(success){
    this.teams = success;
  }
  //fail
  getTeamFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }


  getDepartmentsMembers(){
    this.api.getDepartmentsMembers().subscribe( s => this.getDpMemberSuccess(s), e => this.getDpMemberError(e));

    //console.log(this.departmentsMembers);
  }
  getDpMemberSuccess(s){
    this.departmentsMembers = s;
    console.log(this.departmentsMembers);
  }
  getDpMemberError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }


  buildForm(){
    this.teamForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      departmentId : [null,[Validators.required]],
      description : ['', [Validators.required]],
    });
  }

  getFormDetails(){
    return {
      name: this.teamForm.get('name').value,
      departmentId: this.teamForm.get('departmentId').value,
      description: this.teamForm.get('description').value
    }
  }

  save(){
    let teamObj : Team = <Team>this.getFormDetails();
    if(!this.editTeam)
      this.api.createTeam(teamObj).subscribe( success => this.addTeamSuccess(success),error => this.addTeamFailed(error));

    else{
      teamObj.teamId = this.editTeam.teamId;
      //this.editDepartment.name = departmentObj.name;
      //this.editDepartment.description = departmentObj.description;
      this.api.updateTeam(teamObj).subscribe( success => this.editTeamSuccess(success),error => this.editTeamFailed(error));

    }

  }

  addTeamSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addTeamFailed(error){
    //console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  editTeamSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editTeamFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  deleteTeamMember(teamId: number, userId: number){
    this.api.deleteTeamMember(teamId, userId).subscribe( suc => this.deleteTeamMemSuccess(suc), err => this.deleteTeamMemFail(err))
  }
  deleteTeamMemSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
  }
  deleteTeamMemFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }


  addedMembers(id : number){

    /*this.api.getTeamMembers(+id).subscribe( x => {
      this.teamMembers = x;
    });*/

    this.api.getTeamMembers(id).subscribe( s => this.getaddedMemberSuccess(s), e => this.getaddedMemberError(e));
    console.log(this.teamMembers);
  }
  getaddedMemberSuccess(s){
    this.departmentsMembers = s;
    console.log(this.departmentsMembers);
  }
  getaddedMemberError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }

  addTeamMembers(teamId : number, userId :number ){
   /* const modalInstance = this.activeModal.open(AddTeamMemberComponent, {windowClass: "largeModal"});
    modalInstance.result.then((res)=>{

      this.getTeamMembers(teamId, userId);
    });
   // console.log(this.teams);*/

  }

  getTeamMembers(teamId: number, userId: number){


  }


//validators
  get teamName(){
    return this.teamForm.get('name');
  }
  get departmentID(){
    return this.teamForm.get('departmentId');
  }
  get teamDescription(){
    return this.teamForm.get('description');
  }


}
