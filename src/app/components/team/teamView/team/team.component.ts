import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAddTeamComponent } from '../../modals/edit-add-team/edit-add-team.component';
import { FormControl } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Team } from 'src/app/models/team';
import { TeamMembers } from 'src/app/models/teamMembers';
import { AddTeamMemberComponent }  from '../../modals/add-team-member/add-team-member.component';

@Component({
  selector: 'app-team',
  host: {class:'full-component'},
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

 // @Input() owner : boolean = false;


  constructor(private modal : NgbModal ,private api : ApiService, private toast : ToastsService) { }

   teams : Team [] = [];
   teamView : Team = null;
p
   teamMembers : TeamMembers [] = [];

  ngOnInit(): void {

    this.getData();
  }

  getData(){
    this.getTeams();
  }

  addTeam(){
    const modalInstance = this.modal.open(EditAddTeamComponent, {windowClass: "largeModal"});
    modalInstance.result.then((res)=>{
      this.getTeams();
    });
    //console.log(this.teams);
  }

  viewTeam(id : number){
    this.teamView = this.teams.find( x => x.teamId == id);
    this.api.getTeamMembers(+id).subscribe( x => {
      this.teamMembers = x;
    });

    console.log(this.teamMembers);
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




  getTeamMembers(teamId : number){
    this.api.getTeamMembers(teamId).subscribe( success => this.getTeamMembersSuccess(success), error => this.getTeamMembersFail(error));
  }
  //success
  getTeamMembersSuccess(success){
    this.teamMembers = success;
    console.log(this.teamMembers);
  }
  //fail
  getTeamMembersFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }






  getTeams()
  {
    this.api.getTeamCards().subscribe( success => this.getTeamSuccess(success), error => this.getTeamFail(error));

  }
  //success
  getTeamSuccess(success){
    this.teams = success;
    //console.log(this.teams);

  }
  //fail
  getTeamFail(error){
    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }



  editTeam(teamObj : any){
    //console.log(this.teams);
    const modalInstance = this.modal.open(EditAddTeamComponent, {windowClass: "largeModal"});
    teamObj = this.teams.find( x => x.teamId == teamObj.teamId);

    modalInstance.componentInstance.editTeam = teamObj;
    modalInstance.result.then(res =>{
     this.getTeams();
    })
    //console.log(this.teams);
  }


  ////////////////////////////////////////////////////Team Member////////////////////////////////////////////////
  viewTeamMember(teamId : number){


  }

  addTeamMembers(teamId : number, userId :number ){
    const modalInstance = this.modal.open(AddTeamMemberComponent, {windowClass: "largeModal"});
    modalInstance.result.then((res)=>{

      this.getTeamMembers(teamId);
    });
   // console.log(this.teams);
  }

  editTeamMember(teamObj: any){
    const modalInstance = this.modal.open(AddTeamMemberComponent, {windowClass: "largeModal"});

    teamObj = this.teamMembers.find( x => x.teamId == teamObj.teamId );
    //can we pass two variables eg x & y ?
    modalInstance.componentInstance.updateTeamMember = teamObj;
    modalInstance.result.then(res =>{
     this.getTeamMembers(teamObj.teamId);
    })
    //console.log(this.teams);
  }

  deleteTeamMember(teamId: number, userId: number){
    this.api.deleteTeamMember(teamId, userId).subscribe( suc => this.deleteTeamMemSuccess(suc), err => this.deleteTeamMemFail(err))
  }

  deleteTeamMemSuccess(success){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});

  }
  deleteTeamMemFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

}

