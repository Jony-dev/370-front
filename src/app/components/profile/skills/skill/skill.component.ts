import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileAddSkillComponent } from 'src/app/components/modals/profileAddSkill/profile-add-skill/profile-add-skill.component';
import { Skill } from 'src/app/models/skill';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  userSkills : Skill [] = [];
  @Input() set setSkills(skills : Skill[]){
    this.userSkills = skills;
  }
  constructor( private modal :NgbModal, private api : ApiService,private helper :JobCardHelperService, private toast : ToastsService ) { }

  ngOnInit(): void {
    
  }

  skillAddition(){
    const modalInstance = this.modal.open(ProfileAddSkillComponent,{ windowClass : "largeModal"});
  }

  removeSkill(id : number){
    this.api.removeUsersSkill(id).subscribe(x => this.helper.emitRefresh(), er => this.toast.display({type:"Error",heading:er.error.Title, message : er.error.message}));
  }

}
