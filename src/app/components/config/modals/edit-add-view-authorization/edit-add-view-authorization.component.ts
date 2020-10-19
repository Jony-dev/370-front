import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Role } from 'src/app/models/role';
import { View } from 'src/app/models/view';
import { ViewAuth } from 'src/app/models/viewAuth';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-view-authorization',
  templateUrl: './edit-add-view-authorization.component.html',
  styleUrls: ['./edit-add-view-authorization.component.css']
})
export class EditAddViewAuthorizationComponent implements OnInit {
  [x: string]: any;

  @Input() viewId : number = null;
  @Input() roleId : number = null;

  //@Input() editViewAuth : ViewAuth = null;


  roles : Role[] = [];
  views : View[] = [];
  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }
  viewAuthForm : FormGroup;


  ngOnInit(): void {
    this.getData();
    this.buildForm();
  }


  getData(){
    this.getRoles();
    this.getViews();
  }

  buildForm(){
    this.viewAuthForm = this.formBuilder.group({
      viewId : [this.roleId,[Validators.required]],
      roleId : [this.viewId,[Validators.required]]
    });
  }

  getFormDetails(){
    return {
      viewId : this.viewAuthForm.get('viewId').value,
      roleId : this.viewAuthForm.get('roleId').value,
    }
  }

  getRoles(){
    this.api.getRoles().subscribe( succ => this.retRolesSucc(succ), err => this.retRolesErr(err))

  }
  retRolesSucc(succ){
    this.roles = succ;
  }
  retRolesErr(err){
    this.toasts.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  getViews(){
    this.api.getViews().subscribe(succ => this.retViewSucc(succ), err => this.retViewErr(err));
  }
  retViewSucc(succ){
    this.views = succ;
  }
  retViewErr(err){
    this.toasts.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  saveViewAuth(){
    let viewAuthObj : any = this.getFormDetails();
    this.api.createViewAuthorisation(viewAuthObj).subscribe( success => this.addViewAuthSuccess(success),error => this.addViewAuthFailed(error));

  }

  addViewAuthSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addViewAuthFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  get userView(){
    return this.viewAuthForm.get('viewId');
  }

  get userRole(){
    return this.viewAuthForm.get("roleId");
  }

}
