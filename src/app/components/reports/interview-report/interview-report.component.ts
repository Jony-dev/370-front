import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { BuildingReport } from 'src/app/models/buildingReport';

@Component({
  selector: 'app-interview-report',
  templateUrl: './interview-report.component.html',
  styleUrls: ['./interview-report.component.css']
})
export class InterviewReportComponent implements OnInit {

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  buildings : BuildingReport [] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getBuildingReport();
  }

  getBuildingReport(){
    this.api.getBuildingReport().subscribe( s => this.buildingReportSuccess(s), e => this.buildingReportError(e));
    console.log(this.buildings);
  }
  buildingReportSuccess(s){
    this.buildings = s;
  }
  buildingReportError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }


}
