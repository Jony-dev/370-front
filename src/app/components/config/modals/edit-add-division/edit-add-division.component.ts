import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Division } from 'src/app/models/division';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-division',
  templateUrl: './edit-add-division.component.html',
  styleUrls: ['./edit-add-division.component.css']
})
export class EditAddDivisionComponent implements OnInit {

  constructor( public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editDivision : Division = null;

  divisionForm : FormGroup;
  //divisions: Division[] =[];

  ngOnInit(): void {
    this.buildForm();

    if(this.editDivision)
    {
      this.divisionForm.get('name').setValue(this.editDivision.name);
      this.divisionForm.get('description').setValue(this.editDivision.description);
    }
  }
/*
  getDivisions(){
    this.api.getDivisions().subscribe( succ => this.retDivisionSucc(succ), err => this.retDivisionsErr(err))

  }
  retDivisionSucc(succ){
    this.divisions = succ;
  }
  retDivisionsErr(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }
*/
  buildForm(){
    this.divisionForm = this.formBuilder.group({
      name : ['', [Validators.required]],
      description : ['', [Validators.required]]
    });
  }

  getFormDetails(){
    return {
      name: this.divisionForm.get('name').value,
      description: this.divisionForm.get('description').value,

    }
  }

  save(){
    let division : any = this.getFormDetails();
   // console.log(division);
    //let divisionObj : Division = <Division><unknown>this.getFormDetails();
    if(!this.editDivision)
      this.api.addDivision(division).subscribe( success => this.addDivisionSuccess(success),error => this.addDivisionFailed(error));
    else{
      division.id = this.editDivision.divisionId;
      console.log(division);
      this.api.editDivision(division).subscribe( success => this.editDivisionSuccess(success),error => this.editDivisionFailed(error));
     }

  }


  addDivisionSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  addDivisionFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editDivisionSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }
  editDivisionFailed(error){
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  get divisionName(){

    return this.divisionForm.get("name");

  }

  get divisionDescription(){

    return this.divisionForm.get("description");

  }

}
