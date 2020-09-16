import { Component, Input, OnInit } from '@angular/core';
import { MyListings } from 'src/app/models/myListings';

@Component({
  selector: 'app-job-listing-card',
  templateUrl: './job-listing-card.component.html',
  styleUrls: ['./job-listing-card.component.css']
})
export class JobListingCardComponent implements OnInit {

  @Input() jobInformation : MyListings;

  description : string;
  constructor() { }

  ngOnInit(): void {
    this.description = this.jobInformation.description.substring(0, 100);
  }

}
