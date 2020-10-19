import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { TeamReport } from 'src/app/models/teamReport';

@Component({
  selector: 'app-team-report',
  templateUrl: './team-report.component.html',
  styleUrls: ['./team-report.component.css']
})
export class TeamReportComponent implements OnInit {

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  teams : TeamReport [] = [];

  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.teamReport();
  }

  teamReport(){
    this.api.teamReport().subscribe( s => this.teamReportSuccess(s), e => this.teamReportError(e));
    console.log(this.teams);
  }
  teamReportSuccess(s){
    this.teams = s;
  }
  teamReportError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }

}
