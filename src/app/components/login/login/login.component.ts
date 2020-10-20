import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsService } from 'src/app/services/toasts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth : AuthService, private builder : FormBuilder, private router : Router, private toast : ToastsService) { }
  userDetails : FormGroup;

  emailInvalid = false;
  displayError : any;

  ngOnInit(): void {
    this.buildForm();
    this.emailInvalid = false;
  }



  buildForm(){
    this.userDetails = this.builder.group({
      'email':['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9._]+\.[a-z]{1,4}$")]],
      'password':['',Validators.required, Validators.minLength(8)]
    });
  }
  getFormValues(){

    return {
      email : this.userDetails.get('email').value,
      password : this.userDetails.get('password').value
    }

  }

  login(){
    this.auth.logIn(this.getFormValues()).subscribe( success => this.logInSuccess(),
     error => this.loginFailed(error));
  }

  logInSuccess(){

    if(this.auth.isLoggedIn)
      this.router.navigate(['/Dashboard/Home']);
  }

  loginFailed(error: any){
    this.emailInvalid = true;
    this.displayError = error.error.message;
  }

  get email(){
    return this.userDetails.get('email');
  }
  get password(){
    return this.userDetails.get('password');
  }
}
