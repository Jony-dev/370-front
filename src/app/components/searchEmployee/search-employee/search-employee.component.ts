import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ToastsService } from 'src/app/services/toasts.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SearchUser} from 'src/app/models/searchUser';
import { EditProfileMComponent } from '../../modals/editProfile/edit-profile-m/edit-profile-m.component';
import { userCard } from 'src/app/models/userCard';
import { User } from 'src/app/models/user';

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


  ngOnInit(): void {

    this.getData();
  }

  getData(){
    this.getSearchUser();
  }



  getSearchUser(){

    this.api.getUsersForSearch().subscribe( s => this.getSearchSuccess(s), e => this.getSearchError(e));
    console.log(this.users);

  }
  getSearchSuccess(s){
    this.users = s;

  }
  getSearchError(e){
    this.toast.display({type : 'Error', heading : e.error.Title, message : e.error.message });
  }

  editProfile(){
   /* const editProfileInstance = this.modal.open(EditProfileMComponent,  { windowClass : "largeModal",backdrop:"static" });
    editProfileInstance.result.then((res) =>{

      console.log(res);
      if(res)
      {

        this.user.imgUrl = res.imgUrl;
        this.user.name = res.name;
        this.user.surname = res.surname;


      }

    })*/

  }




}
