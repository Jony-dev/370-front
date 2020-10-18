import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EditAddViewAuthorizationComponent } from 'src/app/components/config/modals/edit-add-view-authorization/edit-add-view-authorization.component';
import { OperationAuthorisation } from 'src/app/models/operationAuthorization';
import { Toast } from 'src/app/models/toast';
import { Role } from 'src/app/models/role';
import { Operation } from 'src/app/models/operation';
import { Database } from 'src/app/models/database';
@Component({
  selector: 'app-authorization',
  host: {class:'full-component'},
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  activeModal: any;

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder) { }

  //FILTER FORM CONTROLS
  roleEffecting : FormControl = new FormControl();
  roleTarget : FormControl = new FormControl();
  database : FormControl = new FormControl();
  operation : FormControl = new FormControl();
  
  newAuthForm : FormGroup;
  operationAuthorisations : OperationAuthorisation [] = [];
  operations : Operation [] = [];
  databaseTables : Database [] = [];
  roles : Role [] = [];
  filteredOperationsAuthorisations : OperationAuthorisation [] = [];

  @Input() editOperationAuthorisation : OperationAuthorisation = null;

  ngOnInit(): void {
    this.getData();
    this.buildForm();
  }

  


  getData(){
    this.getOperationAuthorisation();
    this.getRoles();
    this.getDatabaseTables();
    this.getOperation();

  }

  buildForm(){

    this.newAuthForm = this.formBuilder.group({
        roleAffected : [null,[Validators.required]],
        roleTarget: [null, [Validators.required]],
        dbTableId : [null, [Validators.required]],
        operationId : [null, [Validators.required]],
      });
  }

  getFormDetails(){
    return {
      roleAffected: this.newAuthForm.get('roleAffected').value,
      roleTarget: this.newAuthForm.get('roleTarget').value,
      dbTableId : this.newAuthForm.get('dbTableId').value,
      operationId : this.newAuthForm.get('operationId').value,
    }
  }

  getOperationAuthorisation(){
    this.api.getOperationAuthorisation().subscribe( success => this.getOperationAuthSuccess(success), error => this.getOperationAuthFail(error))
  }
  //success
  getOperationAuthSuccess(operationAuth: OperationAuthorisation[]){
    this.operationAuthorisations = operationAuth;
  }
  //fail
  getOperationAuthFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }
  getDatabaseTables(){
    this.api.getDatabaseTables().subscribe( success => this.getDatabaseTSuccess(success), error => this.getDatabaseTFail(error))
  }
  //success
  getDatabaseTSuccess(databaseTable: Database[]){
    this.databaseTables = databaseTable;
  }
  //fail
  getDatabaseTFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  getRoles(){
    this.api.getRoles().subscribe( success => this.getRoleSuccess(success), error => this.getRoleFail(error))
  }
  //success
  getRoleSuccess(role: Role[]){
    this.roles = role;
  }
  //fail
  getRoleFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }
  getOperation(){
    this.api.getOperation().subscribe( success => this.getOperationSuccess(success), error => this.getOperationFail(error))
  }
  //success
  getOperationSuccess(operation: Operation[]){
    this.operations = operation;
  }
  //fail
  getOperationFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }



  deleteOperationAuthorisation(operationId : number, roleTarget : number, roleAffected : number, dbTableId : number){

    let authObj = {operationId , roleTarget, roleAffected, dbTableId};
    this.api.deleteOperationAuthorisation( authObj).subscribe( suc => this.deleteSuccess(suc), err => this.deleteFail(err))
  }
  deleteSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getOperationAuthorisation();
  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  createOperationAuthorisation(){
    const modalInstance = this.modal.open(AuthorizationComponent);
    modalInstance.result.then((res)=>{

      this.getOperationAuthorisation();
    });
  }
  createOperation(){
    const modalInstance = this.modal.open(AuthorizationComponent);
    modalInstance.result.then((res)=>{

      this.getOperation();
    });
  }

  save(){
    let authorisationObj = this.getFormDetails();
    this.api.createOperationAuthorisation(authorisationObj).subscribe( success => this.addOperationAuthorisationSuccess(success),error => this.addOperationAuthorisationFailed(error));
  }

  addOperationAuthorisationSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.getOperationAuthorisation();
  }
  addOperationAuthorisationFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  get getTargetId(){
    return this.newAuthForm.get("roleTarget");
  }

  get getDatabaseId(){
    return this.newAuthForm.get("dbTableId");
  }

  get getOperationId(){
    return this.newAuthForm.get("operationId");
  }

  get getEffectorId(){
    return this.newAuthForm.get("roleAffected");
  }



}
