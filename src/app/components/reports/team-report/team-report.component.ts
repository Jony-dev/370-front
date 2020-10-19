import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import {TeamReport} from 'src/app/models/teamReport';

@Component({
  selector: 'app-team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.css']
})
export class TeamReportComponent implements OnInit {

  teamReports : TeamReport [] = [];

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  ngOnInit(): void {
    this.getData();

  }

  getData(){
    this.teamReport();
  }

  teamReport(){
    this.api.teamReport().subscribe( s => this.teamReportSuccess(s), e => this.teamReportError(e));

  }
  teamReportSuccess(s : TeamReport[]){
    this.teamReports = s;
    console.log(this.teamReports);
  }
  teamReportError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }
}
