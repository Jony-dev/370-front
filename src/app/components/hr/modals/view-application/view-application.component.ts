import { Component, Input, OnInit } from '@angular/core';
import { ApplicantPoolCard } from 'src/app/models/applicantPool';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {

  @Input() applicantDetails : ApplicantPoolCard = null;

  skills : any [] = [];
  requirements : any [] = [];
  lQuestions : any [] = [];
  languages : any [] = [];
  cvLocation : string = null;
  test : string = null;
  constructor(private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.getApplication();
  }

  getApplication(){
    this.api.getApplication(this.applicantDetails.applicationId).subscribe( x => this.gotApplication(x), e => this.fail(e));
  }
  gotApplication(res : any){
    this.skills = res.skillAnswers;
    this.requirements = res.requirementAnswers;
    this.lQuestions = res.lQuestionAnswers;
    this.languages = res.languageAnswers;
    this.cvLocation = res.cv;
    this.test = res.test;
    console.log(this.test);
  }
  fail( err : any){
    this.toast.display({type : "Error", heading : err.error.Title, message : err.errorr.message});
  }

}
