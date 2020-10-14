import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchUser} from 'src/app/models/searchUser';

@Component({
  selector: 'app-search-employee',
  host: {class:'full-component'},
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  constructor( private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  users : SearchUser[] = [];

  ngOnInit(): void {

    this.getData();
  }

  getData(){
    this.getSearchUser();
  }

  getSearchUser(){

    this.api.getUsersForSearch().subscribe( s => this.getSearchSuccess(s), e => this.getSearchError(e));

  }
  getSearchSuccess(s){
    this.users = s;
    console.log(this.users);
  }
  getSearchError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }




}
