import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Language } from 'src/app/models/language';
import { ApiService } from 'src/app/services/api.service';
import { JobCardHelperService } from 'src/app/services/job-card-helper.service';

@Component({
  selector: 'app-profile-add-language',
  templateUrl: './profile-add-language.component.html',
  styleUrls: ['./profile-add-language.component.css']
})
export class ProfileAddLanguageComponent implements OnInit {

  languages : Language [] = [];
  searchLang : FormControl = new FormControl();
  
  constructor(public activeModal : NgbActiveModal, private api : ApiService, private helper : JobCardHelperService) { }
  
  ngOnInit(): void {
    this.api.getUnassignedLangs().subscribe(x => {
      this.languages = x;
    });
  }

  addLanguage(id : number){
    this.api.addUsersLanguage(id).subscribe(x => {
      this.helper.emitRefresh();
      this.languages = this.languages.filter( y => y.id != id);
    })
  }


}
