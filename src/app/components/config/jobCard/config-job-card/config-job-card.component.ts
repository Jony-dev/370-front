import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditAddStageComponent } from '../../modals/edit-add-stage/edit-add-stage.component';
import { EditAddTestComponent } from '../../modals/edit-add-test/edit-add-test.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { Stage } from 'src/app/models/stage';
import { Test } from 'src/app/models/test';
import { FilterStage } from 'src/app/components/system/pipes/stageFilter.pipe';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-config-job-card',
  host : { class : 'full-component'},
  templateUrl: './config-job-card.component.html',
  styleUrls: ['./config-job-card.component.css']
})
export class ConfigJobCardComponent implements OnInit {

  stages : Stage [] = [];
  tests : Test[] = [];

  stageSearch : FormControl = new FormControl();
  constructor(private modal: NgbModal, private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
    this.getData();
  }

  addStage(){
    const modalInstance = this.modal.open(EditAddStageComponent);
    modalInstance.result.then((res) =>{

      this.getStages();
    });
  }

  getData(){
    this.getStages();
    this.getTests();

  }

  getStages(){
    this.api.getStages().subscribe( success => this.getStagesSuccess(success), error => this.getStagesFail(error))
  }

  getStagesSuccess(stages: Stage[]){
    console.log(stages);
    this.stages = stages;
  }
  getStagesFail(error:any){

    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  editStage(id : number){
    console.log(this.stages);
    const modalInstance = this.modal.open(EditAddStageComponent);
    let stage = this.stages.find( x => x.id == id);
    modalInstance.componentInstance.editStage = stage;
    modalInstance.result.then(res =>{

      this.getStages();
    })
    console.log(this.stages);
  }

  deleteStage(id : number){
    this.api.deleteStage(id).subscribe( suc => this.deleteSuccess(suc, id), err => this.deleteFail(err))
  }

  deleteSuccess(success, id){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getStages();
  }
  deleteFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }

  //////////////////////////////test Component /////////////////////////////////////////////////////////////////

  addTest(){
    console.log('test');
    const modalInstance = this.modal.open(EditAddTestComponent);
    modalInstance.result.then((res) => {

      this.getTests();
    });
  }

  getTests(){
    this.api.getTests().subscribe( success => this.getTestsSuccess(success), error => this.getTestsFail(error))
  }

  getTestsSuccess(tests: Test[]){
    console.log(tests);
    this.tests = tests;
  }
  getTestsFail(error:any){

    this.toast.display({type : "Error", heading :error.error.Title, message : error.error.message });
  }

  editTest(id : number){
    console.log(this.tests);
    const modalInstance = this.modal.open(EditAddTestComponent);
    let test = this.tests.find( x => x.testId == id);
    modalInstance.componentInstance.editTest = test;
    modalInstance.result.then(res =>{

      this.getTests(); ///is it suppose to be getTest();
    })
    console.log(this.tests);
  }

  deleteTest(id : number){
    this.api.deleteTest(id).subscribe( suc => this.deleteTestSuccess(suc, id), err => this.deleteTestFail(err))
  }

  deleteTestSuccess(success, id){
    this.toast.display({type:"Success", heading : success.Title, message : success.message});
    this.getTests();
  }
  deleteTestFail(error){
    this.toast.display({type:"Error", heading : error.error.Title, message : error.error.message});
  }







}
