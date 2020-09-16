import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/models/toast';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-edit-add-role',
  templateUrl: './edit-add-role.component.html',
  styleUrls: ['./edit-add-role.component.css']
})
export class EditAddRoleComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editRole : Role = null;

  roleForm : FormGroup;

  ngOnInit(): void {
    this.buildForm();

    if(this.editRole)
      this.roleForm.get('role').setValue(this.editRole.roleName);
  }

  buildForm(){
    this.roleForm = this.formBuilder.group({
      role : ['',[Validators.required]]
    });

  }

  getFormDetails(){

    return {
      name : this.roleForm.get('role').value,
    }
  }
  save(){

    let role : any = this.getFormDetails();
    console.log(role);
    if(!this.editRole)
      this.api.addRole(role).subscribe( success => this.addRoleSuccess(success),error => this.addRoleFailed(error));
    else{
      role.id = this.editRole.roleId;
      this.editRole.roleName = role.roleName;
      this.api.editRole(role).subscribe( success => this.editRoleSuccess(success),error => this.editRoleFailed(error));
    }

  }

  addRoleSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addRoleFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editRoleSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editRoleFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get userRole(){
    return this.roleForm.get('role');
  }


}
