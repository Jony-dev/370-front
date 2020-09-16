import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-reject-card',
  templateUrl: './reject-card.component.html',
  styleUrls: ['./reject-card.component.css']
})
export class RejectCardComponent implements OnInit {

  rejection : FormGroup;
  @Input() cardId : number = null;

  constructor(  private formBuilder : FormBuilder, 
                private activeModal : NgbActiveModal, 
                private helper : JobCardHelperService, 
                private toast : ToastsService,
                private api : ApiService) { }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(){
    this.rejection = this.formBuilder.group({
      comment : [ '' , [Validators.required]]
    })
  }
  reject(){
    let reject = this.rejection.value;
    this.api.rejectJobCard(+this.cardId, reject.comment).subscribe( succ => this.rejectSuccess(), error => this.error(error))
  }

  rejectSuccess(){
    this.helper.emitRefresh();
    this.activeModal.close();
  }

  error(err){
    this.toast.display({type : "Error", heading : err.error.Tile, message : err.error.message});
  }
  cancel(){
    this.activeModal.close();
  }


}
