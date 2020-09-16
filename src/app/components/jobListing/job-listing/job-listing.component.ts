import { Component, OnInit } from '@angular/core';
import { MyListings } from 'src/app/models/myListings';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit {

  listings : MyListings[] = [];

  constructor(private api : ApiService) { }

  ngOnInit(): void {
  }

  loadData(){

  }

  getListings(){
    
  }

}
