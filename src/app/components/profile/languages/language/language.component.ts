import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileAddLanguageComponent } from 'src/app/components/modals/profileAddLanguage/profile-add-language/profile-add-language.component';
import { Language } from 'src/app/models/language';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {

  languages : Language [] = [];

  @Input()set setLanguages(langs : Language[]){
    this.languages = langs;
    console.log(langs);
  }

  constructor(private modal : NgbModal, private api : ApiService) { }

  ngOnInit(): void {
  }

  addLanguage(){
    const modalInstance = this.modal.open(ProfileAddLanguageComponent,{windowClass:"largeModal"});
  }

  removeLanguage(id : number){
    this.api.removeUsersLanguage(id).subscribe(x=>{
      this.languages = this.languages.filter( y => y.id != id);
    })
  }
}
