import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from 'src/app/models/test';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-test',
  templateUrl: './edit-add-test.component.html',
  styleUrls: ['./edit-add-test.component.css']
})
export class EditAddTestComponent implements OnInit {

  constructor( public activeModal : NgbActiveModal,  private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editTest : Test = null; // property description of
  testForm : FormGroup;

   ngOnInit(): void {
    this.buildForm();

    if(this.editTest){

      this.testForm.get('test').setValue(this.editTest.testName);
      this.testForm.get('testDescription').setValue(this.editTest.description);
      this.testForm.get('testUrl').setValue(this.editTest.url);

    }

  }

  buildForm(){
    this.testForm = this.formBuilder.group({
      test : ['',[Validators.required]],
      testDescription : ['', [Validators.required]],
      testUrl : ['',[Validators.required]]

    });
  }

  getFormDetails(){

    return {
      testName : this.testForm.get('test').value,
      description : this.testForm.get('testDescription').value,
      url : this.testForm.get('testUrl').value  //Needs to match with the model.ts

    }
  }

  save(){

    let test : any = this.getFormDetails();
    console.log(test);
    if(!this.editTest)
      this.api.addTest(test).subscribe( success => this.addTestSuccess(success),error => this.addTestFailed(error));
    else{

      test.id = this.editTest.testId;
      this.editTest.testName = test.testName;
      this.editTest.url = test.testUrl;
      this.editTest.description = test.testDescription;
     ///////////description, url ?
      this.api.editTest(test).subscribe( success => this.editTestSuccess(success),error => this.editTestFailed(error));
    }

  }

  addTestSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addTestFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editTestSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editTestFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get testName(){

    return this.testForm.get("test");
  }

  get testDescription(){

    return this.testForm.get("testDescription");
  }

  get testUrl(){

    return this.testForm.get("testUrl");
  }




}
