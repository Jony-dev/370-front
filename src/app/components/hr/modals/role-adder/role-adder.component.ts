import { Component, Input, OnInit } from '@angular/core';
import { Role } from 'src/app/models/role';
import { Toast } from 'src/app/models/toast';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-role-adder',
  templateUrl: './role-adder.component.html',
  styleUrls: ['./role-adder.component.css']
})
export class RoleAdderComponent implements OnInit {

  @Input() userId : number;
  @Input() currentRoles : Role [];

  roles : Role [] = [];
  constructor(private api : ApiService, private toast : ToastsService, private helper : JobCardHelperService) { }



  ngOnInit(): void {
    this.getRoles();
  }



  getRoles(){
    this.api.getRoles().subscribe(x => 
      {
        this.roles = x;
        this.roles = this.roles.map( x => {
          return {roleId : +x.roleId, roleName : x.roleName}
          });
          let test = this.currentRoles.map(x => x.roleId);
          this.roles = this.roles.filter(x => !test.includes(x.roleId));
      }, e => this.loadError(e));
  }
  
  loadError(err){
    this.toast.display({type : "Error", heading : err.error.Title, message : err.error.message});
  }

  addRole(id : number){
    this.api.addUserRole(id, this.userId).subscribe(x => this.roles = this.roles.filter(x => x.roleId != id), e=> this.loadError(e));
    this.helper.emitRefresh();
  }
  

}
