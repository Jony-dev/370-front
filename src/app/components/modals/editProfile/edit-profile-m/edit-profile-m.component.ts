import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadImageComponent } from '../../uploadImage/upload-image/upload-image.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Country } from 'src/app/models/country';
import { Nationality } from 'src/app/models/Nationality';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Toast } from 'src/app/models/toast';
import { ToastsService } from 'src/app/services/toasts.service';
import { Observable } from 'rxjs';
import { UserProfile } from 'src/app/models/userProfile';
import { userCard } from 'src/app/models/userCard';
import { ResetPasswordComponent } from '../../reset-password/reset-password.component';
import { Skill } from 'src/app/models/skill';
import { Language } from 'src/app/models/language';

@Component({
  selector: 'app-edit-profile-m',
  templateUrl: './edit-profile-m.component.html',
  styleUrls: ['./edit-profile-m.component.css']
})
export class EditProfileMComponent implements OnInit {

  profileOwner : UserProfile = null;
  editProfile :FormGroup;
  userDetails : User;
  country$ : Observable<Country[]>;
  nationality$ : Observable<Nationality[]>;
  skills : Skill [] = [];
  languages : Language [] = [];

  constructor( public activeModal : NgbActiveModal, private modal : NgbModal, private formBuilder : FormBuilder, private api : ApiService, private toast : ToastsService) {

  }


  ngOnInit(): void {

    this.country$ = this.api.getCountries();
    this.nationality$ = this.api.getNationalities();
    this.api.getUserSkills().subscribe( x => {
      this.skills = x.skills;
      this.languages = x.languages;
    })
    this.getProfileDetails();
    this.buildForm();
  }


  changeImage(){
    const uploadInstance = this.modal.open(UploadImageComponent, { size: 'lg', backdrop: 'static' });
    uploadInstance.result.then((res) =>{

      if(res && res!="")
      {
        this.profileOwner.imgUrl = res;
      }

    });
  }

  changePassword(){
    const modalInstance = this.modal.open(ResetPasswordComponent,{ size: 'lg'});

  }
  buildForm(){
    this.editProfile = this.formBuilder.group({
      name : ['',[Validators.required, Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$") ]],
      surname : ['',[Validators.required,  Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")]],
      contact : ['',[Validators.required, Validators.maxLength(10) ]],
      email : ['',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,4}$")]],
      countryId : [null,[Validators.required]],
      nationalityId : [null,[Validators.required]],
    });
  }

  get userName(){
    return this.editProfile.controls['name'];
  }
  get userSurname(){
    return this.editProfile.controls['surname'];
  }
  get userContact(){
    return this.editProfile.controls['contact'];
  }
  get userEmail(){
    return this.editProfile.controls['email'];
  }
  get userCountry(){
    return this.editProfile.controls['countryId'];
  }
  get userNationality(){
    return this.editProfile.controls['nationalityId'];
  }
  get userPass(){
    return this.editProfile.controls['password'];
  }
  get userPassConfirm(){
    return this.editProfile.controls['passconfirm'];
  }

  getProfileDetails(){
    this.api.getUsersOwnProfile().subscribe(
      success => this.populatePage(success),
      error => this.errorRetrieving(error)
      );

  }
  populatePage(userInfo : UserProfile){
    this.profileOwner = userInfo;
    this.profileOwner.imgUrl = this.profileOwner.imgUrl ? this.profileOwner.imgUrl : "../../../../../assets/profile/empty.png";
    console.log(this.profileOwner);
    this.editProfile.setValue({
      name : userInfo.name,
      surname : userInfo.surname,
      contact : userInfo.contact,
      email : userInfo.email,
      countryId : userInfo.country.id,
      nationalityId : userInfo.nationality.nationalityId
    });
  }
  errorRetrieving(error){

    const cardError = error.error;
    this.toast.display({type:"error",heading:error.Title,message : cardError.message + "\n" + error.message});
    this.activeModal.close();
  }

  saveChanges(){
      this.api.editAccount(this.getFormValues()).subscribe(
        success =>
        {
          this.activeModal.close({id : this.profileOwner.id, userName: this.getFormValues().name, userSurname : this.getFormValues().surname, imgUrl : this.profileOwner.imgUrl});
          this.toast.display({type:"success",heading : success.Title, message : success.message})
        },
        error =>
        {
          const cardError = error.error;
          this.toast.display({type:"error",heading:error.Title,message : cardError.message + "\n" + error.message});
        }
      );
  }
  getFormValues(){

    return {
      name : this.editProfile.get('name').value,
      surname : this.editProfile.get('surname').value,
      email : this.editProfile.get('email').value,
      contact : this.editProfile.get('contact').value,
      countryId : this.editProfile.get('countryId').value,
      nationalityId : this.editProfile.get('nationalityId').value,
    }
  }

  dismiss(){

    this.activeModal.close(this.profileOwner);

  }

}
