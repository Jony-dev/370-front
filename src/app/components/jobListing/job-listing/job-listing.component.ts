import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyApplication } from 'src/app/models/myApplication';
import { MyListings } from 'src/app/models/myListings';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-job-listing',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css']
})
export class JobListingComponent implements OnInit, OnDestroy {

  listings : MyListings[] = [];
  applications : MyApplication [] = [];
  refSub : Subscription;
  constructor(private api : ApiService, private toast : ToastsService, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.loadData();
    this.refSub = this.helper.shouldRefresh$.subscribe(succ => this.loadData());
  }
  ngOnDestroy(){
    this.refSub.unsubscribe();
  }

  loadData(){
    this.getListings();
    this.getMyApplications();
  }

  getListings(){
    this.api.getJobListing().subscribe( succ => this.listSuccess(succ), err => this.loadError(err))
  }

  loadError(err){
    this.toast.display({type: "Error",heading : err.error.Title, message : err.error.message});
  }
  listSuccess(listings : MyListings []){
    console.log(listings);
    this.listings = listings;
  }

  getMyApplications(){
    this.api.getMyApplication().subscribe( succ => this.applications = succ, err => this.loadError(err))
  }

}
