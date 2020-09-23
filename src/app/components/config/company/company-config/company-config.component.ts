import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAddDivisionComponent } from '../../modals/edit-add-division/edit-add-division.component';
import { EditAddDepartmentComponent } from '../../modals/edit-add-department/edit-add-department.component';
import { Department } from 'src/app/models/department';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Division } from 'src/app/models/division';
import { Team } from 'src/app/models/team';

@Component({
  selector: 'app-company-config',
  host : { class : 'full-component'},
  templateUrl: './company-config.component.html',
  styleUrls: ['./company-config.component.css']
})
export class CompanyConfigComponent implements OnInit {

  departments : Department [] = [];
  divisions : Division [] = [];

  departmentView : Department = null;
  departmentTeams : Team [] = []

  divisionView : Division = null;
  divisionDepartments : Department [] = [];
  constructor( private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getDepartments();
    this.getDivisions();
  }

  addDivision(){
    const modalInstance = this.modal.open(EditAddDivisionComponent);
    modalInstance.result.then((res)=>{

          this.getDivisions();
    });


  }
  addDepartment(){
    const modalInstance = this.modal.open(EditAddDepartmentComponent);
    modalInstance.result.then((res)=>{

      this.getDepartments();
 });

  }


  getDepartments()
  {
    this.api.getDepartments().subscribe( success => this.getDepartmenSuccess(success), error => this.getDepartmentFail(error))
  }
  getDivisions()
  {
    this.api.getDivisions().subscribe( success => this.getDivisionSuccess(success), error => this.getDivisionFail(error))
  }
  //success
  getDepartmenSuccess(departments: Department[]){
    console.log(departments);
    this.departments = departments;
  }
  //fail
  getDepartmentFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }
  //success
  getDivisionSuccess(division: Division[]){
    console.log(division);
    this.divisions = division;
  }
  //fail
  getDivisionFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  deleteDepartment(departmentId : number){
    this.api.deleteDepartment(departmentId).subscribe( suc => this.deleteSuccess(suc, departmentId), err => this.deleteFail(err))
  }
  deleteDivision(id : number){
    this.api.deleteDivision(id).subscribe( suc => this.deleteSuccessDiv(suc, id), err => this.deleteFailDiv(err))
  }

  deleteSuccess(success, departmentId){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getDepartments();
  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }
  deleteSuccessDiv(success, id){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getDivisions();
  }
  deleteFailDiv(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  editDepartment(id : number){
    console.log(this.departments);
    const modalInstance = this.modal.open(EditAddDepartmentComponent);
    let department = this.departments.find( x => x.departmentId == id);
    //let location = this.locations.find( x => x.name == lo);
    modalInstance.componentInstance.editDepartment = department;
    modalInstance.result.then(res =>{

      this.getDepartments();
    })
    console.log(this.departments);
  }
  editDivision(divisionId : number){
    console.log(this.divisions);
    const modalInstance = this.modal.open(EditAddDivisionComponent);
    let division = this.divisions.find( x => x.divisionId == divisionId);
    //let location = this.locations.find( x => x.name == lo);
    modalInstance.componentInstance.editDivision = division;
    modalInstance.result.then(res =>{

      this.getDivisions();
    })
  }

  viewDepartment(id : number){
    this.departmentView = this.departments.find( x => x.departmentId == id);
    this.api.getTeamsByDepartment(+id).subscribe( x => {
      this.departmentTeams = x;
    });
  }

  viewDivision(id : number){

  }

}
