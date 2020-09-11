import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Role } from 'src/app/models/role';
import { View } from 'src/app/models/view';

@Component({
  selector: 'app-edit-add-view-authorization',
  templateUrl: './edit-add-view-authorization.component.html',
  styleUrls: ['./edit-add-view-authorization.component.css']
})
export class EditAddViewAuthorizationComponent implements OnInit {

  @Input() viewId : number = null;
  @Input() roleId : number = null;


  roles : Role[] = [];
  views : View[] = [];
  constructor(public activeModal: NgbActiveModal, private toasts: ToastsService, private formBuilder : FormBuilder, private api : ApiService) { }
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

  // getFormDetails(){

  //   return {

  //   }
  // }

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
    alert("not done");
  }

  get userView(){
    return this.viewAuthForm.get('viewId');
  }

  get userRole(){
    return this.viewAuthForm.get("roleId");
  }

}
