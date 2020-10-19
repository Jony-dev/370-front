import { Component, OnInit, Input } from '@angular/core';
import { stringify } from 'querystring';
import { FormControl } from '@angular/forms';
import { UserProfile } from 'src/app/models/userProfile';

export class bmwMonth{
  month : number;
  year : number;
  tracker : number;
}

@Component({
  selector: 'app-booking',
  host: {class:'full-component'},
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  
  @Input() user : UserProfile = null;
  @Input() bookingType : string = "individual";
  
  monthName : string;
  currentMonth : bmwMonth = new bmwMonth;
  displayMonths : bmwMonth [] = [];
  constructor() { 
  }
  
  previousNumMonths : number = 1;
  numMonths = new FormControl(1);

  ngOnInit(): void {
    this.setCurrentMonth();
    this.numMonths.valueChanges.subscribe( x => this.updateMonths(x));
  }

  ngOnDestroy(){
  
  }


  setCurrentMonth(){
    
    //Use Date to set the current month
    let dateObj = new Date();
    this.currentMonth.month = dateObj.getMonth();
    this.currentMonth.year = dateObj.getUTCFullYear();
    this.currentMonth.tracker = Math.floor(Math.floor((Math.random()*100)+1));
    this.displayMonths.push(this.currentMonth);
    
    this.updateMonthDisplay()
    
  }
  updateMonthDisplay(){
    //Get the name of the primary month
    this.monthName = new Date(this.currentMonth.year ,this.currentMonth.month+1 ,0).toLocaleString('default', { month: 'long' });
  }

  nextMonth(){
    this.displayMonths.forEach(el => this.incMonth(el));
    
    
  }

  previousMonth(){
    this.displayMonths.forEach(el => this.decMonth(el));
  }

  incMonth( month : bmwMonth){
    if(month.month >= 11){
      month.month = 0;
      month.year += 1;
      
    }
    else
      month.month += 1;

      month.tracker = (Math.floor((Math.random()*1000)+1));
      this.updateMonthDisplay();
  }

  decMonth( month: bmwMonth){
    if(month.month <= 0){
      month.month = 12;
      month.year -= 1;
    }
    else
      month.month -=1;

      month.tracker = (Math.floor((Math.random()*1000)+1));
      this.updateMonthDisplay();
  }

  updateMonths( x : number){
    

     let increase = x - this.previousNumMonths;
     this.previousNumMonths = x;
    //need to remove one month becuase 1 displays 1 all ready
    
    if (increase > 0)
      for( let i = 0; i < increase; i++){
        let newMonth : bmwMonth = new bmwMonth;
        newMonth.year = this.displayMonths[ this.displayMonths.length - 1].month + 1 > 11 ? this.displayMonths[ this.displayMonths.length - 1].year += 1 : this.displayMonths[ this.displayMonths.length - 1].year;
        newMonth.month = this.displayMonths[ this.displayMonths.length - 1].month + 1 > 11 ? 0 : this.displayMonths[ this.displayMonths.length - 1].month + 1;
        this.displayMonths.push(newMonth);
      }
    else{
      for( let i = 0; i < increase * -1; i++){
        this.displayMonths.pop();
      }
    }   
  }
  
  trackByFn(index , item){
    return item.tracker;
  }
  

}
