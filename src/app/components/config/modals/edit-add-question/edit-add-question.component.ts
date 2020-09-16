import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LongQuestion } from 'src/app/models/longQuestion';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { Toast } from 'src/app/models/toast';

@Component({
  selector: 'app-edit-add-question',
  templateUrl: './edit-add-question.component.html',
  styleUrls: ['./edit-add-question.component.css']
})
export class EditAddQuestionComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  @Input() editLongQuestion : LongQuestion = null;

  questionForm : FormGroup;
  ngOnInit(): void {
    this.buildForm();

    if(this.editLongQuestion)
      this.questionForm.get('question').setValue(this.editLongQuestion.question);
  }

  buildForm(){
    this.questionForm = this.formBuilder.group({
      question : ['',[Validators.required]]
    });
  }

  getFormDetails(){

    return {
      question : this.questionForm.get('question').value
    }
  }
  save(){

    let question : LongQuestion = <LongQuestion>this.getFormDetails();
    if(!this.editLongQuestion)
      this.api.addLongQuestions(question).subscribe( success => this.addQuestionSuccess(success),error => this.addQuestionFailed(error));
    else{
      question.id = this.editLongQuestion.id;
      this.api.editLongQuestion(question).subscribe( success => this.editQuestionSuccess(success),error => this.editQuestionFailed(error));
    }

  }

  addQuestionSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  addQuestionFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }
  editQuestionSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
  }

  editQuestionFailed(error){
    console.log(error);
    let toast = new Toast;
    toast.type = "Error";
    toast.heading = error.error.Title;
    toast.message = error.error.message;
    this.toast.display(toast);
    this.activeModal.close();

  }

  get userQuestion(){
    return this.questionForm.get('question');
  }

}
