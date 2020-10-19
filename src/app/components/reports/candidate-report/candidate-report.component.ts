import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { CardReport } from 'src/app/models/cardReport';
import { CardCount } from 'src/app/models/cardCount';


@Component({
  selector: 'app-candidate-report',
  templateUrl: './candidate-report.component.html',
  styleUrls: ['./candidate-report.component.css']
})
export class CandidateReportComponent implements OnInit {

  cards : CardReport [] = [];
  count : number;

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }



  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getCardReport();
    this.getCardCount();
  }

  getCardReport(){
    this.api.getCardReport().subscribe( s => this.cardReportSuccess(s), e => this.cardReportError(e));
  }
  cardReportSuccess(s){
    this.cards = s;
  }
  cardReportError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }

  getCardCount(){
    this.api.getCardCount().subscribe( s => this.cardCountSuccess(s), e => this.cardCountError(e));
  }
  cardCountSuccess(s){
    this.count = s;
  }
  cardCountError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }


}
