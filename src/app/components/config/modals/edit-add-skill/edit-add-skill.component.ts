import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/models/skill';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Toast } from 'src/app/models/toast';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-edit-add-skill',
  templateUrl: './edit-add-skill.component.html',
  styleUrls: ['./edit-add-skill.component.css']
})
export class EditAddSkillComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editSkill : Skill = null;

  skillForm : FormGroup;
  ngOnInit(): void {
    this.buildForm();

    if(this.editSkill)
      this.skillForm.get('skill').setValue(this.editSkill.skill);
  }

  buildForm(){
    this.skillForm = this.formBuilder.group({
      skill : ['',[Validators.required]]
    });
  }

  getFormDetails(){

    return {
      skill : this.skillForm.get('skill').value,
    }
  }
  save(){

    let skill : Skill = <Skill>this.getFormDetails();
    if(!this.editSkill)
      this.api.addSkill(skill).subscribe( success => this.addSkillSuccess(success),error => this.addSkillFailed(error));
    else{
      skill.id = this.editSkill.id;
      this.api.editSkill(skill).subscribe( success => this.editSkillSuccess(success),error => this.editSkillFailed(error));
    }

  }

  addSkillSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addSkillFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editSkillSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editSkillFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get userSkill(){
    return this.skillForm.get('skill');
  }

}
