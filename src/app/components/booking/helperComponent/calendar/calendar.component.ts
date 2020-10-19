import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { bmwMonth } from '../../booking/booking.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditDeskBookingComponent } from '../../modals/add-edit-desk-booking/add-edit-desk-booking.component';
import { AddEditSlotBookingComponent } from '../../modals/add-edit-slot-booking/add-edit-slot-booking.component';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { BookableDate } from 'src/app/models/bookableDate';
import { BookingCap } from 'src/app/models/bookingCap';
import { UserBooking } from 'src/app/models/userBooking';
import { Subscription } from 'rxjs';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { userCard } from 'src/app/models/userCard';
import { GroupBookingCap } from 'src/app/models/groupBookingCap';
import { GroupBooking } from 'src/app/models/groupBooking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {

  year : number;
  currentMonth : string;
  days: any [] = [];
  userBookings : UserBooking [] = [];
  bookingDays : BookableDate [] = [];
  groupDays : GroupBooking [] = [];
  bookingEncap : BookingCap;
  groupEncap : GroupBookingCap;
  refreshSub : Subscription;
  constructor(private modal: NgbModal, private api : ApiService, private toast : ToastsService, private helper : JobCardHelperService) { }

  calendarInput : bmwMonth;
  @Input() user : userCard = null;
  @Input() set changeCalendarInput( calendarDate : bmwMonth){
    this.calendarInput = calendarDate;
  }
  @Input()calendarType : string ="individual";

   
  ngOnDestroy(){
    this.refreshSub.unsubscribe();
  }
  ngOnInit(): void {
   
    this.currentMonth = new Date(this.calendarInput.year , this.calendarInput.month+1 ,0).toLocaleString('default', { month: 'long' });
    this.year = this.calendarInput.year;
    this.getCalendarDates();
    this.refreshSub = this.helper.shouldRefresh$.subscribe( x => this.getCalendarDates())
  }

  constructCalendar(){
    
    //let date = new Date(this.calendarInput.year , this.calendarInput.month);
    let startingDay = new Date(this.calendarInput.year , this.calendarInput.month).getDay();
    let endingDay = new Date(this.calendarInput.year , this.calendarInput.month+1,0).getDate();
    let counter = 0;
    this.days = Array(42).fill({date:null, bookingId: null, tableId: null, tableName: null, time: null}).map( (x,i) => {
      let dateCompare = new Date(this.calendarInput.year, this.calendarInput.month, counter+1);
      if( i < startingDay || counter >= endingDay)
        return x;

      else
      {
        counter += 1;
        let dateRecord : BookableDate;
        let bookingRecord : UserBooking = null;
        let groupRecord : GroupBooking = null;
        if(dateRecord = this.bookingDays.find(x => {
          let booking = new Date(x.date);
          if(booking.getMonth() == dateCompare.getMonth() && booking.getDate() == dateCompare.getDate()) 
            {
              if(this.calendarType =="individual")
                bookingRecord = this.userBookings.find(y => y.dateId == x.dateId);
              else
                groupRecord = this.groupDays.find(y => y.dateId == x.dateId);

              return x;
            }
        } )){
          if(this.calendarType == "individual")
            return {date:counter,dateId: dateRecord.dateId, bookable : dateRecord.bookable , bookingId: bookingRecord ? bookingRecord.bookingId: null, tableId: bookingRecord ? bookingRecord.tableId: null, tableName: bookingRecord ? bookingRecord.name: null, time: null, buildingId : bookingRecord ? bookingRecord.buildingId : null};
          else
            return {date:counter,dateId: dateRecord.dateId, bookable : dateRecord.bookable , bookingId: null, tableId: null, tableName: groupRecord ? groupRecord.numBookings: null, time: null, buildingId : null};

        }
          

        return x;
      }
        
        
    });
  }

  openBookingScreen(booking?:any){
    console.log(booking);
    
      if(this.calendarType === "individual")
        this.openDeskBooking(booking);
      
      else
        this.openBoardRoomBooking(booking);
  }

  openDeskBooking(booking?:any){

    if(booking){
        const modalInsatnce = this.modal.open(AddEditDeskBookingComponent, { windowClass : "mediumModal"});
        modalInsatnce.componentInstance.booking = booking;
        modalInsatnce.componentInstance.user = this.user;
    }
    else{
        const modalInsatnce = this.modal.open(AddEditDeskBookingComponent, { windowClass : "mediumModal"});
    }

  }

  editDeskBooking(){

  }
  
  openBoardRoomBooking(booking?:any){

      const modalInsatnce = this.modal.open(AddEditSlotBookingComponent, { windowClass : "largeModal"});
      modalInsatnce.componentInstance.booking = booking;
      modalInsatnce.componentInstance.user = this.user;
  }

  getCalendarDates(){

    //CONVERT TO BACKEND
    let month = this.calendarInput.month + 1;
    if(this.calendarType == "individual"){
      if(!this.user)
      this.api.getBookableDates( month, this.year).subscribe( x => 
        {
            this.bookingEncap = x;
            this.bookingDays = x.bookableDates;
            this.userBookings = x.userBookings;
            this.constructCalendar(); 
        });
      else{
        this.api.getEmpBookableDates( month, this.year, this.user.id).subscribe( x => 
          {
              this.bookingEncap = x;
              this.bookingDays = x.bookableDates;
              this.userBookings = x.userBookings;
              this.constructCalendar(); 
          });
      }
    }
    else{
      if(!this.user)
      this.api.getGroupDates( month, this.year).subscribe( x => 
        {
          console.log(x);
            this.groupEncap = x;
            this.bookingDays = x.bookableDates;
            this.groupDays = x.groupBookings;
            this.constructCalendar(); 
        });
      else{
        this.api.getEmpGroupDates( month, this.year, this.user.id).subscribe( x => 
          {
              this.groupEncap = x;
              this.bookingDays = x.bookableDates;
              this.groupDays = x.groupBookings;
              this.constructCalendar();
          });
      }
    }
    
    
  }

  cancelBooking(booking : UserBooking){
    this.api.cancelUserBooking(booking).subscribe( x => 
      {
        this.toast.display({type : 'Success', heading : (<any>x).Title, message : (<any>x).message});
        this.getCalendarDates();
      },
      er => this.toast.display({type : 'Error', heading : (<any>er).error.Title, message : (<any>er).error.message}))
  }

  

}