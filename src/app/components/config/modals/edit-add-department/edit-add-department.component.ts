import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/models/toast';
import { Division } from 'src/app/models/division';
import { Department } from 'src/app/models/department';

@Component({
  selector: 'app-edit-add-department',
  templateUrl: './edit-add-department.component.html',
  styleUrls: ['./edit-add-department.component.css']
})
export class EditAddDepartmentComponent implements OnInit {

  constructor( public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editDepartment : Department = null;
 // @Input() divisionId : string= null;


  divisions: Division[] =[];
  departmentForm : FormGroup;

  ngOnInit(): void {
    this.getData();
    this.buildForm();

    if(this.editDepartment)
    {
      this.departmentForm.get('divisionId').setValue(this.editDepartment.divisionId);
      this.departmentForm.get('name').setValue(this.editDepartment.name);
      this.departmentForm.get('description').setValue(this.editDepartment.description);
    }

  }
  getData(){
    this.getDivisions();
  }
  getDivisions(){
    this.api.getDivisions().subscribe( succ => this.retDivisionSucc(succ), err => this.retDivisionsErr(err))

  }
  retDivisionSucc(succ){
    this.divisions = succ;
  }
  retDivisionsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }


  buildForm(){
    this.departmentForm = this.formBuilder.group({
      divisionId : [null,[Validators.required]],
      name : ['', [Validators.required]],
      description : ['', [Validators.required]],
    });
  }

  getFormDetails(){
    return {
      divisionId: this.departmentForm.get('divisionId').value,
      name: this.departmentForm.get('name').value,
      description: this.departmentForm.get('description').value,

    }
  }

  save(){
    let departmentObj : Department = <Department>this.getFormDetails();
    //let department : any = this.getFormDetails();
    if(!this.editDepartment)
      this.api.addDepartment(departmentObj).subscribe( success => this.addDepartmentSuccess(success),error => this.addDepartmentFailed(error));
    else{
      departmentObj.departmentId = this.editDepartment.departmentId;
      //this.editDepartment.name = departmentObj.name;
      //this.editDepartment.description = departmentObj.description;
      this.api.editDepartment(departmentObj).subscribe( success => this.editDepartmentSuccess(success),error => this.editDepartmentFailed(error));
     }

  }


  addDepartmentSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addDepartmentFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editDepartmentSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  editDepartmentFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  get divisionID(){

    return this.departmentForm.get('divisionId');
  }

  get divisionName(){

    return this.departmentForm.get('name');
  }

  get divisionDescription(){

    return this.departmentForm.get('description');
  }



}
