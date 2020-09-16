import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Requirement } from 'src/app/models/requirement';
import { Toast } from 'src/app/models/toast';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';


@Component({
  selector: 'app-pending-requirement',
  templateUrl: './pending-requirement.component.html',
  styleUrls: ['./pending-requirement.component.css']
})
export class PendingRequirementComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  pendingReqform : FormGroup;
  //@Input() editReq : Requirement = null;
  requirements: Requirement[] = [];


  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getPendingRequirements();
  }
  getPendingRequirements(){
    this.api.getPendingRequirements().subscribe( succ => this.succRec(succ), err => this.errReq(err));
  }
  succRec(succ){
    this.requirements = succ;
  }
  errReq(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }


  save(id : number){
      this.api.approveRequirement(id).subscribe(success => this.addReqSuccess(success),error => this.addReqFailed(error));

    }

  addReqSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addReqFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

}
