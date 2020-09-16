import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/models/skill';
import { Toast } from 'src/app/models/toast';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-pending-skill',
  templateUrl: './pending-skill.component.html',
  styleUrls: ['./pending-skill.component.css']
})
export class PendingSkillComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  skills: Skill[] = [];


  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getPendingSkills();
  }
  getPendingSkills(){
    this.api.getPendingSkills().subscribe( succ => this.succRec(succ), err => this.errReq(err));
  }
  succRec(succ){
    this.skills = succ;
  }
  errReq(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }


  save(id : number){
      this.api.approveSkill(id).subscribe(success => this.addSkillSuccess(success),error => this.addSkillFailed(error));

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

  deleteSkill(id : number){
    this.api.deleteSkill(id).subscribe( suc => this.deleteSkillSuccess(suc), err => this.deleteSkillFail(err))
  }
  deleteSkillSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getPendingSkills();
  }
  deleteSkillFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }


}
