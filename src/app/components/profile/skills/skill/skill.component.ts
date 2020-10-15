import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileAddSkillComponent } from 'src/app/components/modals/profileAddSkill/profile-add-skill/profile-add-skill.component';
import { Skill } from 'src/app/models/skill';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  userSkills : Skill [] = [];
  @Input() skills : Skill [] = [];
  constructor( private modal :NgbModal, private api : ApiService, ) { }

  ngOnInit(): void {
    this.userSkills = this.skills;
  }

  skillAddition(){
    const modalInstance = this.modal.open(ProfileAddSkillComponent,{ windowClass : "largeModal"});
  }

  removeSkill(id : number){
    
  }

}
