import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {

  // Creating instance FormGroup
  LoginForm:FormGroup;  // Declare a FormGroup to manage the form structure
  RegisterForm:FormGroup;  // Declare a FormGroup to manage the form structure
  InvalidUser:boolean = false;
  InvalidMsg:String|undefined;
  toggleForm:String = "Login";
  RegisterMsg:any;
  alreadyRegister:Boolean = false;

  // Inject the FormBuilder services/class constructor Injection
  // Inject the auth services
  // Inject the route services
  constructor(private fb:FormBuilder,private auth:AuthService, private route:Router, 
              @Inject(PLATFORM_ID) private platformId:Object, private helper:HelperService){

    // Initialize Login Form fields
    this.LoginForm = this.fb.group({
        // declare FormControlName fields
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
    });

    // Initialize Register Form fields
    this.RegisterForm = this.fb.group({
        // declare FormControlName fields
        name:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]]
    });
  }

  // after constructor first method load for only once is ngOnInit method
  ngOnInit(){

      // angular platform is browser (isPlatformBrowser inbuilt checks the platform)
      if(isPlatformBrowser(this.platformId)){
        // get token from the local storage
        const token = localStorage.getItem('token');
       
        // check is not null
        if(token){
          // check token is valid or not
          if(this.helper.isTokenExpired(token)){
            // token not expire navigate to home
             this.route.navigate(['/home'])
          }
        }
      }
  
  }

  // toggle login signup
  toggleLoginSignup(type:String){
    this.toggleForm = type;
  }

  // Login Form submit
  userLogin(){
    if(!this.LoginForm.invalid){

      let body = {
        email:this.LoginForm.value.email,
        password:this.LoginForm.value.password
      }

      // Login 
      this.auth.Login(body).subscribe({  // subscribe method consume the observer emitted by the login
        next:(value)=>{ // successfull
          // console.log(value);

          // Setting the Invalid login msg
          if(value?.error == "user not found" || value?.error == "Invalid Credentials"){
            this.InvalidUser = true;
            this.InvalidMsg = value.error;
          }
          // user successfully login
          else if(value?.msg){

            // Storage jwt token in browser local storage
            localStorage.setItem('token',value.token);
            
            // successfully login navigate to home page
            this.route.navigate(['/home'])
          }
        },
        error:(error)=>{ // failed
          console.log(error);
        }
      });
    }
  }

  userRegister(){
    if (!this.RegisterForm.invalid) {
      // console.log(this.RegisterForm.value);

      let body = {
        name:this.RegisterForm.value.name,
        email:this.RegisterForm.value.email,
        password:this.RegisterForm.value.password
      }

      // register the user
      this.auth.Register(body).subscribe({ // subscribe method consume the observer emitted by the Register
        next:(value)=>{ // successfull
          // console.log(value);

          // show msg box
          this.alreadyRegister = true;
          this.RegisterMsg = value;
        },
        error:(error)=>{ // failed
          console.log(error);
        }
      })
    }
  }
}
