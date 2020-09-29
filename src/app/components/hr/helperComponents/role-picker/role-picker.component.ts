import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/models/role';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { RoleAdderComponent } from '../../modals/role-adder/role-adder.component';

@Component({
  selector: 'app-role-picker',
  templateUrl: './role-picker.component.html',
  styleUrls: ['./role-picker.component.css']
})
export class RolePickerComponent implements OnInit, OnDestroy {

  constructor(private modal : NgbModal, private api : ApiService, private helper : JobCardHelperService, private toast : ToastsService) { }

  refreshHelper : Subscription;
  userId : number;

  @Input() set setUser(id : number){
    this.userId = id;
    this.getOwnRoles();
  }
  userRoles : Role [] = [];

  ngOnInit(): void {
    this.refreshHelper = this.helper.shouldRefresh$.subscribe( x => this.getOwnRoles())
  }
  ngOnDestroy(){
    this.refreshHelper.unsubscribe();
  }

  openRoleAdder(){
    const modalInstance = this.modal.open(RoleAdderComponent, {windowClass : "mediumModal"});
    modalInstance.componentInstance.currentRoles = this.userRoles;
    modalInstance.componentInstance.userId = this.userId;
  }

  getOwnRoles(){
    this.api.getUserRoles(this.userId).subscribe(x => {this.userRoles = x; console.log(x);});
    
  }

  removeRole(id : number){
    this.api.removeUserRole(id,this.userId).subscribe( s => this.getOwnRoles(), e => this.loadError(e))
  }

  loadError(e : any){
    this.toast.display({type : "Error", heading : e.error.Title, message : e.error.message})
  }
}
