import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { GroupBookingReport } from 'src/app/models/groupBookingReport';
import { IndividualBookingReport } from 'src/app/models/individualBookingReport';

@Component({
  selector: 'app-booking-report',
  templateUrl: './booking-report.component.html',
  styleUrls: ['./booking-report.component.css']
})
export class BookingReportComponent implements OnInit {

  groupBooking : GroupBookingReport [] = [];
  individualBooking : IndividualBookingReport [] = [];

  constructor(private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }



  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.getGroupBookingReport();
    this.getIndividualBookingReport();
  }

  getGroupBookingReport(){
    this.api.getGroupBookingReport().subscribe( s => this.buildingGroupBookingSuccess(s), e => this.buildingGroupBookingError(e));
  }
  buildingGroupBookingSuccess(s){
    this.groupBooking = s;
  }
  buildingGroupBookingError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }


  getIndividualBookingReport(){
    this.api.getIndividualBookingReport().subscribe( s => this.buildingIndividualBookingSuccess(s), e => this.buildingIndividualBookingError(e));
  }
  buildingIndividualBookingSuccess(s){
    this.individualBooking = s;
  }
  buildingIndividualBookingError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }
}
