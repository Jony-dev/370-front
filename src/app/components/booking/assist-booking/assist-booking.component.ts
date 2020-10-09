import { Component, OnInit } from '@angular/core';
import { Team } from 'src/app/models/team';
import { userCard } from 'src/app/models/userCard';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-assist-booking',
  templateUrl: './assist-booking.component.html',
  styleUrls: ['./assist-booking.component.css']
})
export class AssistBookingComponent implements OnInit {

  constructor(private api : ApiService) { }

  bookingFor : userCard = null;
  teams : Team [] = [];
  employees : userCard [] = [];
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.getInitData()
  }
  getInitData(){
    this.api.getAssistantSearch().subscribe( x => 
      {
        console.log(x);
        this.teams = (<any>x).teams;
        this.employees = (<any>x).employees;
        
      })
  }

  selectEmployee(emp : userCard){
    this.bookingFor = emp;
  }

}
