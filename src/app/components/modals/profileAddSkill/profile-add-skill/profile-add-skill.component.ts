import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Skill } from 'src/app/models/skill';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';

@Component({
  selector: 'app-profile-add-skill',
  templateUrl: './profile-add-skill.component.html',
  styleUrls: ['./profile-add-skill.component.css']
})
export class ProfileAddSkillComponent implements OnInit {

  skills : Skill [] = [];
  constructor(public activeModal : NgbActiveModal, private api : ApiService, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.api.getUnassignedSkills().subscribe(x => this.skills = x);
  }
  addSkill(id : number){
    this.api.addUsersSkill(id).subscribe(x => {
      this.skills = this.skills.filter(y => y.id != id);
      this.helper.emitRefresh();
    });
  }

}
