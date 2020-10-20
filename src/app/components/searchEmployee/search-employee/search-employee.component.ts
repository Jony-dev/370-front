import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchUser} from 'src/app/models/searchUser';
import { EditProfileMComponent } from '../../modals/editProfile/edit-profile-m/edit-profile-m.component';
import { userCard } from 'src/app/models/userCard';
import { User } from 'src/app/models/user';
import { Department } from 'src/app/models/department';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-employee',
  host: {class:'full-component'},
  templateUrl: './search-employee.component.html',
  styleUrls: ['./search-employee.component.css']
})
export class SearchEmployeeComponent implements OnInit {

  constructor( private modal : NgbModal , private api : ApiService, private toast : ToastsService) { }

  users : SearchUser[] = [];
  userProfileCard : userCard;
  user : User;
  departments : Department [] = [];

  searchText : FormControl = new FormControl();
  userType : FormControl = new FormControl();
  departmentId : FormControl = new FormControl();
  
  ngOnInit(): void {

    this.getData();
  }

  getData(){
    this.getSearchUser();
    this.getDepartments();
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

  getDepartments(){
    this.api.getDepartments().subscribe(x => {
      this.departments = x;
    }, er =>{
      this.getSearchError(er);
    })
  }



}
