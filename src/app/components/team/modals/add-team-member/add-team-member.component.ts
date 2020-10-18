import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Team } from 'src/app/models/team';
import { TeamMembers } from 'src/app/models/teamMembers';
import { Toast } from 'src/app/models/toast';
import { Department } from 'src/app/models/department';
import { User } from 'src/app/models/user';
import { DepartmentsMembers } from 'src/app/models/departmentsMembers';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private api : ApiService, private toast : ToastsService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {

  }

@Input() teamMember : TeamMembers = null;

save(teamId: number, userId: number){
    this.api.createTeamMember(teamId, userId).subscribe( success => this.addTeamSuccess(success),error => this.addTeamFailed(error));
}

addTeamSuccess(success){
  let toast = new Toast;
  toast.type = "Success";
  toast.heading = success.Title;
  toast.message = success.message;
  this.toast.display(toast);
  this.activeModal.close();
}

addTeamFailed(error){
  //console.log(error);
  let toast = new Toast;
  toast.type = "Error";
  toast.heading = error.error.Title;
  toast.message = error.error.message;
  this.toast.display(toast);
  this.activeModal.close();

}


}
