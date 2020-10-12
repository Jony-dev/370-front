import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditAddViewAuthorizationComponent } from 'src/app/components/config/modals/edit-add-view-authorization/edit-add-view-authorization.component';
import { OperationAuthorisation } from 'src/app/models/operationAuthorization';
import { Toast } from 'src/app/models/toast';
import { Role } from 'src/app/models/role';
import { DatabaseTable } from 'src/app/models/databaseTable';
import { Operation } from 'src/app/models/operation';
@Component({
  selector: 'app-authorization',
  host: {class:'full-component'},
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  activeModal: any;

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder) { }

  authForm : FormGroup;
  newAuthForm : FormGroup;
  operationAuthorisations : OperationAuthorisation [] = [];
  operations : Operation [] = [];
  databaseTables : DatabaseTable [] = [];
  roles : Role [] = [];
  filteredOperationsAuthorisations : OperationAuthorisation [] = [];

  @Input() editOperationAuthorisation : OperationAuthorisation = null;

  ngOnInit(): void {
    this.getData();
    this.buildForm();

    this.onChanges();
  }

  onChanges(): void {
    this.authForm.get('dbtableid').valueChanges.subscribe(val => {
      this.filteredOperationsAuthorisations = val.getFormDetails();
    });
    console.log('change supposed to happen.')
  }


  getData(){
    this.getOperationAuthorisation();
    this.getRoles();
    this.getDatabaseTables();
    this.getOperation();

  }

  buildForm(){
    this.authForm = this.formBuilder.group({
      roleaffected : [null,[Validators.required]],
      roletarget: [null, [Validators.required]],
       dbtableid : [null, [Validators.required]],
       operationid : [null, [Validators.required]],
    });
    this.newAuthForm = this.formBuilder.group({
      roleaffected : [null,[Validators.required]],
      roletarget: [null, [Validators.required]],
       dbtableid : [null, [Validators.required]],
       operationid : [null, [Validators.required]],
    });
  }

  getFormDetails(){
    return {
      roleaffected: this.authForm.get('roleaffected').value,
      roletarget: this.authForm.get('roletarget').value,
      dbtableid : this.authForm.get('dbtableid').value,
      operationid : this.authForm.get('operationid').value,

    }
  }

  getOperationAuthorisation(){
    this.api.getOperationAuthorisation().subscribe( success => this.getOperationAuthSuccess(success), error => this.getOperationAuthFail(error))
  }
  //success
  getOperationAuthSuccess(operationAuth: OperationAuthorisation[]){
    console.log(operationAuth);
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
  getDatabaseTSuccess(databaseTable: DatabaseTable[]){
    console.log(databaseTable);
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
    console.log(role);
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
    console.log(operation);
    this.operations = operation;
  }
  //fail
  getOperationFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }



  deleteOperationAuthorisation(operationAuthorisation : OperationAuthorisation){
    this.api.deleteOperationAuthorisation( operationAuthorisation).subscribe( suc => this.deleteSuccess(suc, operationAuthorisation), err => this.deleteFail(err))

  }
  deleteSuccess(success, operationAuthorisation){
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
    let authorisationObj : OperationAuthorisation = <OperationAuthorisation>this.getFormDetails();
    //let department : any = this.getFormDetails();

      this.api.createOperationAuthorisation(authorisationObj).subscribe( success => this.addOperationAuthorisationSuccess(success),error => this.addOperationAuthorisationFailed(error));
  }

  addOperationAuthorisationSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addOperationAuthorisationFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  /////////////////////////
  get roleEffected(){

    return this.authForm.get("roleaffected");
  }

  get roleTarget(){

    return this.authForm.get("roletarget");
  }

  get database(){
    return this.authForm.get("dbtableid");
  }

  get Operation(){
    return this.authForm.get("operationid");

  }

  get roleEffectedn(){

    return this.authForm.get("roleaffected");
  }

  get roleTargetn(){

    return this.newAuthForm.get("roletarget");
  }

  get databasen(){
    return this.newAuthForm.get("dbtableid");
  }

  get Operationn(){
    return this.newAuthForm.get("operationid");

  }









}
