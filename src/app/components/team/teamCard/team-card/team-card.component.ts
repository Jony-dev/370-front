import { Component, OnInit, Input } from '@angular/core';
import { Team } from 'src/app/models/team';
import { ApiService } from 'src/app/services/api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { FormControl } from '@angular/forms';
import { EditAddTeamComponent } from '../../modals/edit-add-team/edit-add-team.component';

@Component({
  selector: 'app-team-card',
  host: {class:'full-component'},
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent implements OnInit {

  @Input() owner : boolean = false;
  teams : Team [] = [];

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {

    this.getData();
  }

  getData(){
    this.getTeams();

  }

  addTeam(){
    const modalInstance = this.modal.open(EditAddTeamComponent);
    modalInstance.result.then((res)=>{

      this.getTeams();
    });
  }

  getTeams()
  {
   // this.api.getTeams().subscribe( success => this.getTeamSuccess(success), error => this.getTeamFail(error));
  }

  //success
  getTeamSuccess(success){

    this.teams = success;
  }
  //fail
  getTeamFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  deleteTeam(teamId : number){
    this.api.deleteTeam(teamId).subscribe( suc => this.deleteSuccess(suc), err => this.deleteFail(err))
  }

  deleteSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});

  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  editTeam(teamObj : any){
    //console.log(this.teams);
    const modalInstance = this.modal.open(EditAddTeamComponent);
    teamObj = this.teams.find( x => x.teamId == teamObj.teamId);

    modalInstance.componentInstance.updateTeam = teamObj;
    modalInstance.result.then(res =>{
     this.getTeams();
    })
    //console.log(this.teams);

    /*
      editSkill(id : number){
    const modalInstance = this.modal.open(EditAddSkillComponent)
    modalInstance.componentInstance.editSkill = this.skills.find( x => x.id == id);
    modalInstance.result.then( (res) =>{
      this.getSkills();
    })
  }
    */
  }




  /*viewTeams(id : number){
    this.teamView = this.teams.find( x => x.teamId == id);
    this.api.getTeamsByDepartment(+id).subscribe( x => {
      this.team = x;
    });
  }*/



}
