import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Toast } from 'src/app/models/toast';
import { Requirement } from 'src/app/models/requirement';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-add-requirement',
  templateUrl: './edit-add-requirement.component.html',
  styleUrls: ['./edit-add-requirement.component.css']
})
export class EditAddRequirementComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editRequirement : Requirement = null;

  requirementForm : FormGroup;
  ngOnInit(): void {
    this.buildForm();

    if(this.editRequirement)
      this.requirementForm.get('requirement').setValue(this.editRequirement.requirement);
  }

  buildForm(){
    this.requirementForm = this.formBuilder.group({
      requirement : ['',[Validators.required]]
    });
  }

  getFormDetails(){

    return {
      requirement : this.requirementForm.get('requirement').value
    }
  }
  save(){

    let requirement : Requirement = <Requirement>this.getFormDetails();
    if(!this.editRequirement)
      this.api.addRequirement(requirement).subscribe( success => this.addRequirementSuccess(success),error => this.addRequirementFailed(error));
    else{
      requirement.id = this.editRequirement.id;
      this.api.editRequirement(requirement).subscribe( success => this.editRequirementSuccess(success),error => this.editRequirementFailed(error));
    }

  }

  addRequirementSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addRequirementFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editRequirementSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editRequirementFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get userRequirement(){
    return this.requirementForm.get('requirement');
  }

}
