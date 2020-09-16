import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Country } from 'src/app/models/country';
import { Nationality } from 'src/app/models/Nationality';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestModalComponent } from 'src/app/components/test-modal/test-modal.component';
import { User } from 'src/app/models/user';
import { ToastsService } from 'src/app/services/toasts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  countries : Country [] = [];
  nationalities : Nationality [] = [];
  userProfile :any;
  userDetails : User;
  constructor( private formBuilder : FormBuilder,
    private api : ApiService,
    private modal : NgbModal,
    private toast : ToastsService,
    private route : Router ) { }


  ngOnInit(): void {
    this.buildForm();
    this.getData();

  }

  buildForm(){
    this.userProfile = this.formBuilder.group({
      name : ['',[Validators.required, Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")]],
      surname : ['',[Validators.required,  Validators.pattern("^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$")]],
      contact : ['',[Validators.required,  Validators.pattern("[0-9]+"), Validators.minLength(10) ]], //SHOULD I KEEP THE TEN DIGIT LIMIT OR LEAVE IT ?
      email : ['',[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{2,4}")]],
      password : ['',[Validators.required, Validators.minLength(8), Validators.pattern("^^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}") ]], //any specific business roles to the structure of the password
      passconfirm : ['',[Validators.required,  Validators.minLength(8),  Validators.pattern("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,}")]],
      countryId : [null,[Validators.required]],
      nationalityId : [null,[Validators.required]],
    });

  }
  // Make all API requests
  getData(){
    this.getCountries();
    this.getNationalities();
  }
  getNationalities(){
    this.api.getNationalities().subscribe( success => this.loadNationalities(success));
  }
  getCountries(){
    this.api.getCountries().subscribe( success => this.loadCountries(success), (error)=> this.errorRetrieved(error));
  }

  loadNationalities(nationality : Nationality[]){
    this.nationalities = nationality;
  }
  loadCountries(countries:Country[]){
    this.countries = countries;

  }

  errorRetrieved( error : any){
    this.toast.display({type:"Error",heading: error.Title, message : error.message});
  }
  createAccount(){
    console.log(this.getFormInformation());
    this.api.createAccount(this.getFormInformation())
    .subscribe( success => this.createAccountSuccess(success),
    error => this.createAccountError(error));

  }
  createAccountSuccess(success : any){
      this.route.navigate(["/AccountCreated"]);
  }
  createAccountError( error: any){
     console.log(error);

  }

  getFormInformation(){

    return{
    name : this.userProfile.get('name').value,
    surname : this.userProfile.get('surname').value,
    email : this.userProfile.get('email').value,
    contact : this.userProfile.get('contact').value,
    countryId : +this.userProfile.get('countryId').value,
    nationalityId : +this.userProfile.get('nationalityId').value,
    password : this.userProfile.get('password').value,
    passwordConfirmation : this.userProfile.get('passconfirm').value,
    }
  }


  get userName(){
    return this.userProfile.controls['name'];
  }
  get userSurname(){
    return this.userProfile.controls['surname'];
  }
  get userContact(){
    return this.userProfile.controls['contact'];
  }
  get userEmail(){
    return this.userProfile.controls['email'];
  }
  get userCountry(){
    return this.userProfile.controls['countryId'];
  }
  get userNationality(){
    return this.userProfile.controls['nationalityId'];
  }
  get userPass(){
    return this.userProfile.controls['password'];
  }
  get userPassConfirm(){
    return this.userProfile.controls['passconfirm'];
  }

}
