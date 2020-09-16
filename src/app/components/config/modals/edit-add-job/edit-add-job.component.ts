import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Job } from 'src/app/models/job';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-job',
  templateUrl: './edit-add-job.component.html',
  styleUrls: ['./edit-add-job.component.css']
})
export class EditAddJobComponent implements OnInit {

  @Input() editJob : Job = null;

  jobForm : FormGroup;

  constructor(public activeModal: NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();

    if(this.editJob)
      this.jobForm.get("name").setValue(this.editJob.name);
  }



  buildForm(){
    this.jobForm = this.formBuilder.group({
      name : ['',[Validators.required]]
    });
  }

  getFormDetails(){
    return {
      name : this.jobForm.get('name').value,
    }
  }

  saveJob(){
    let job : any = this.getFormDetails();
    //console.log(job);
    if(!this.editJob)
      this.api.createJob(job).subscribe( success => this.addJobSuccess(success),error => this.addJobFailed(error));
    else{
      job.id = this.editJob.id;
      this.editJob.name = job.name;
      this.api.editJob(job).subscribe( success => this.editJobSuccess(success),error => this.editJobFailed(error));
    }
  }

  addJobSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addJobFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editJobSuccess(succ){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = succ.Title;
    toast.message = succ.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editJobFailed(err){
    console.log(err);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = err.error.Title;
    toast.message = err.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }



}
