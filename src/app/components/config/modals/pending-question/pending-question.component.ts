import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LongQuestion } from 'src/app/models/longQuestion';
import { Toast } from 'src/app/models/toast';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-pending-question',
  templateUrl: './pending-question.component.html',
  styleUrls: ['./pending-question.component.css']
})
export class PendingQuestionComponent implements OnInit {

  constructor(public activeModal : NgbActiveModal, private toast : ToastsService, private api : ApiService, private formBuilder : FormBuilder) { }

  questionForm : FormGroup;
  @Input() editQuestion : LongQuestion = null;
  questions: LongQuestion [] = [];

  ngOnInit(): void {

    this.getData();
  }


  getData(){
    this.getPendingQuestions();
  }

  getPendingQuestions(){
    this.api.getPendingLongQuestions().subscribe( succ => this.succRec(succ), err => this.errReq(err));
  }
  succRec(succ){
    this.questions = succ;
  }
  errReq(err){
    this.toast.display({type:"Error", heading : err.error.Title, message : err.error.message + "\n" + err.message})
  }

  save(id : number){
      this.api.approveLongQuestion(id).subscribe( success => this.addQuestionSuccess(success),error => this.addQuestionFailed(error));

  }

   addQuestionSuccess(success){
    let toast = new Toast;
    toast.type = "Success";
    toast.heading = success.Title;
    toast.message = success.message;
    this.toast.display(toast);
    this.activeModal.close();
    location.reload();
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








}
