import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAddSkillComponent } from '../../modals/edit-add-skill/edit-add-skill.component';
import { EditAddQuestionComponent } from '../../modals/edit-add-question/edit-add-question.component';
import { EditAddRequirementComponent } from '../../modals/edit-add-requirement/edit-add-requirement.component';
import { PendingSkillComponent } from '../../modals/pending-skill/pending-skill.component';
import { PendingQuestionComponent } from '../../modals/pending-question/pending-question.component';
import { PendingRequirementComponent } from '../../modals/pending-requirement/pending-requirement.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Skill } from 'src/app/models/skill';
import { Requirement } from 'src/app/models/requirement';
import { LongQuestion } from 'src/app/models/longQuestion';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-configskills-and-qs',
  host : { class : 'full-component'},
  templateUrl: './configskills-and-qs.component.html',
  styleUrls: ['./configskills-and-qs.component.css']
})
export class ConfigskillsAndQsComponent implements OnInit {

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  skillControl : FormControl = new FormControl();
  requirementControl : FormControl = new FormControl();
  questionControl : FormControl = new FormControl();

  skills : Skill [] = [];
  requirements : Requirement [] = [];
  longQuestions : LongQuestion [] = [];
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getSkills();
    this.getRequirements();
    this.getQuestions();
  }



  /////////////////////////////////  Pending  //////////////////////////////////////////////////
  pendingSkills(){
    const modalInstance = this.modal.open(PendingSkillComponent, {windowClass : "largeModal"});
    modalInstance.result.then((res)=>{
      this.getPendingRequirements();
    })
  }
  getPendingRequirements(){
    this.api.getPendingRequirements().subscribe( success => this.getPendReqSuccess(success), error => this.getPendReqFail(error))
    }
    //success
    getPendReqSuccess(requirements: any){
      console.log(requirements);
      this.requirements = requirements;
    }
    //fail
    getPendReqFail(error){
      this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
    }

  pendingQuestions(){
    const modalInstance = this.modal.open(PendingQuestionComponent, {windowClass : "largeModal"});
  }

  pendingRequirements(){
    const modalInstance = this.modal.open(PendingRequirementComponent, {windowClass : "largeModal"});
  }
  /////////////////////////////  Skills  ////////////////////////////////////////////////////////////////////////
  getSkills(){
    this.api.getSkills().subscribe( s => this.getSkillsSuccess(s), e => this.getSkillsError(e));
  }
  getSkillsSuccess(s){
    this.skills = s;
  }
  getSkillsError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }

  addSkill(){
    const modalIntance = this.modal.open(EditAddSkillComponent);
    modalIntance.result.then( ()=>{
      this.getSkills();
    });
  }

  editSkill(id : number){
    const modalInstance = this.modal.open(EditAddSkillComponent)
    modalInstance.componentInstance.editSkill = this.skills.find( x => x.id == id);
    modalInstance.result.then( (res) =>{
      this.getSkills();
    })
  }

  deleteSkill(id : number){
    this.api.deleteSkill(id).subscribe( suc => this.deleteSkillSuccess(suc), err => this.deleteSkillFail(err))
  }
  deleteSkillSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getSkills();
  }
  deleteSkillFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  ///////////////////////////////  Requirements  //////////////////////////////////////////////////////////////
  getRequirements(){
    this.api.getRequirements().subscribe(success => this.getReqSuccess(success), err => this.getReqFailed(err));
  }
  getReqSuccess(success){
    this.requirements = success;
  }
  getReqFailed(err){
    this.toast.display({type: "Error", heading : err.error.title, message : err.error.message});
  }

  addRequirement(){
    const modalIntance = this.modal.open(EditAddRequirementComponent);
    modalIntance.result.then( ()=>{
      this.getRequirements();
    });
  }

  editRequirement(id : number){
    const modalInstance = this.modal.open(EditAddRequirementComponent);
    modalInstance.componentInstance.editRequirement = this.requirements.find(x => x.id == id);
    modalInstance.result.then( ()=>{
      this.getRequirements();
    });
  }

  deleteRequirement(id : number){
    this.api.deleteRequirement(id).subscribe( suc => this.deleteRequirementSuccess(suc), err => this.deleteRequirementFail(err))
  }

  deleteRequirementSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getRequirements();
  }
  deleteRequirementFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  ///////////////////////////////  Questions  ////////////////////////////////////////////
  getQuestions(){
    this.api.getLongQuestions().subscribe( success => this.getLongQSuccess(success), err => this.getLongQFail(err))
  }

  getLongQSuccess(success){
    this.longQuestions = success;
  }

  getLongQFail(err){
    this.toast.display({type: "Error", heading : err.error.title, message : err.error.message});
  }

  addQuestion(){
    const modalIntance = this.modal.open(EditAddQuestionComponent);
    modalIntance.result.then( ()=>{
      this.getQuestions();
    });
  }

  editLongQuestion(id : number){
    const modalInstance = this.modal.open(EditAddQuestionComponent);
    modalInstance.componentInstance.editLongQuestion = this.longQuestions.find(x => x.id == id);
    modalInstance.result.then( ()=>{
      this.getQuestions();
    });
  }

  deleteLongQuestion(id : number){
    this.api.deleteLongQuestion(id).subscribe( suc => this.deleteLongQSuccess(suc), err => this.deleteLongQFail(err))
  }
  deleteLongQSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getQuestions();
  }
  deleteLongQFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }



}
