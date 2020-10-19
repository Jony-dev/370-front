import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import Stepper from "bs-stepper";
import { ApplicationQuestions } from 'src/app/models/applicationQuestions';
import { Language } from 'src/app/models/language';
import { LongQuestion } from 'src/app/models/longQuestion';
import { Requirement } from 'src/app/models/requirement';
import { Skill } from 'src/app/models/skill';
import { Test } from 'src/app/models/test';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';
@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {

  @Input() cardId : number;
  private stepper: Stepper;

  testFile = new FormControl('');
  cvFile = new FormControl('');
  tests : Test [] = []
  skills : Skill[] = [];
  languages : Language[] = [];
  requirements : Requirement[] = [];
  longQuestions : LongQuestion [] = [];


  skillAnswers = new FormArray([]);
  languageAnswers = new FormArray([]);
  requirementAnswers = new FormArray([]);
  longQuestionAnswers = new FormArray([]);

  testFiles : File;
  cv : File;

  constructor(private api : ApiService , private toast : ToastsService, private activeModal : NgbActiveModal, private helper : JobCardHelperService, private router : Router) { }

  next() {
    this.stepper.next();
  }
  previous() {
    this.stepper.previous();
  }

  ngOnInit() {
    this.loadData();
    this.stepper = new Stepper(document.querySelector('#stepper1'), {
      linear: false,
      animation: true
    })
  }

  loadData(){
    this.getQuestions();
  }
  getQuestions(){
    this.api.getApplicationQuestions(this.cardId).subscribe( succ => this.gotCardInformation(succ), err => this.loadError(err));
  }

  loadError(err){
    this.toast.display({type : "Error", heading : err.error.Title, message : err.error.message});
  }

  gotCardInformation(data : ApplicationQuestions){
    this.setSkillQuestions(data.skills);
    this.setLongQuestions(data.longQuestions);
    this.setRequirements(data.requirements);
    this.setLanguages(data.languages);
    this.setTests(data.tests);
  }

  setSkillQuestions(skills : Skill[]){
    skills.forEach( el =>{
      this.skillAnswers.push(new FormControl(null));
      this.skills.push(el);
    });
  
  }

  setLongQuestions(questions : LongQuestion[]){
    
    questions.forEach( el =>{
      this.longQuestionAnswers.push(new FormControl(''));
      this.longQuestions.push(el);
    });

  }

  setRequirements( requirements : Requirement[]){
    requirements.forEach( el =>{
      this.requirementAnswers.push(new FormControl(null));
      this.requirements.push(el);
    });
  }

  setLanguages( langs : Language[]){

    langs.forEach( lang =>{
      this.languageAnswers.push(new FormControl(null));
      this.languages.push(lang);
    });
  }

  setTests(tests : Test []){
    this.tests = tests;
  }

  attachTests(event){
    const acceptedType = ['application/x-zip-compressed'];

    this.testFiles = event.target.files[0];
    if(this.testFiles && acceptedType.includes(this.testFiles['type'])){
      
    }
    else{
      this.toast.display({type : "Error", heading : "Invalid File", message : " Please make sure to add a zip file"});
      this.testFiles = null;
      this.testFile.setValue('');
    }
  }

  attachCV(event){
    const acceptedType = ['application/pdf'];

    this.cv = event.target.files[0];
    if(this.cvFile && acceptedType.includes(this.cv['type'])){
      
    }
    else{
      this.toast.display({type : "Error", heading : "Invalid File", message : " Please make sure to add a PDF file to the CV"});
      this.cvFile = null;
      this.cvFile.setValue('');
    }
  }
  getAnswers(){
    let answer : any  = {};
    
    let skills : any [] = [];
    let questions : any [] = [];
    let requirements : any [] = [];
    let languages : any [] = [];

    this.skills.forEach( (el,i)=>{
      skills.push({ id : el.id, answer : this.skillAnswers.controls[i].value})
    });
     
    this.longQuestions.forEach( (el,i)=>{
      questions.push({ id : el.id, answer : this.longQuestionAnswers.controls[i].value})
    });
   
    this.requirements.forEach( (el,i)=>{
      requirements.push({ id : el.id, answer : this.requirementAnswers.controls[i].value})
    });

    this.languages.forEach( (el,i)=>{
      languages.push({ id : el.id, answer : this.languageAnswers.controls[i].value})
    });
    answer.skills = skills;
    answer.questions = questions;
    answer.requirements = requirements;
    answer.languages = languages;
    answer.cardId = this.cardId;
    console.log("ANSWER",answer);
    this.api.applyForJob(answer, this.cv, this.testFiles).subscribe( succ => this.applySuccess(succ),err => this.loadError(err))

  }

  applySuccess(succ : any){
    this.helper.emitRefresh();
    this.toast.display({type : "Success", heading : succ.Title,message : succ.message });
    this.activeModal.close();
    this.router.navigate(["Dashboard/JobListing"])
  }
}
