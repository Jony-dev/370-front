import { Component, OnInit, Input } from '@angular/core';
import { JobCardInfo } from 'src/app/models/jobCardInfo';
import { ToastsService } from 'src/app/services/toasts.service';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';


@Component({
  selector: 'app-job-information',
  templateUrl: './job-information.component.html',
  styleUrls: ['./job-information.component.css']
})
export class JobInformationComponent implements OnInit {

  @Input() cardId : number;


  cardInformation : JobCardInfo;
  constructor( private toast : ToastsService, private api : ApiService, private helper : JobCardHelperService) { }

  ngOnInit(): void {
    this.getJobCardDetails();
  }

  getJobCardDetails(){
    this.api.getJobCardInfo(this.cardId).subscribe( succ => this.gotJobInfo(succ), err => this.loadError(err))
  }
  gotJobInfo(result : JobCardInfo){
    this.cardInformation = result;
    console.log(this.cardInformation);
  }

  loadError(err){
    this.toast.display({type : "Error", heading : err.error.Title, message : err.error.message});
  }
  goTo(url : string){
    window.open(url);
  }
  

}
