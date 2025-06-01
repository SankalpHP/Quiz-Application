import { Component } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
    
  // Creating instance FormGroup
  profileForm:FormGroup;
  userId:any;
  userName:any;
  updatemsg:any;

  // Injecting the class/services
  constructor(private helper:HelperService,private fb:FormBuilder,private route:ActivatedRoute,private auth:AuthService){

    this.getuserDetails();

    // Initialize the empty form
    this.profileForm = this.fb.group({
        name:['',[Validators.required]],
        email:['',[Validators.required,Validators.email]],
        age:['',[Validators.required]],
        country:[''],
        state:[''],
        profession:[''],
    });
  }

  ngOnInit(){
     // getting token from localstorage
    const token = localStorage.getItem('token');

    if(token != null){
      const payload = JSON.parse(atob(token?.split('.')[1]));
      this.userName = payload.name;
    }
  }
  

  country:any = this.helper.countries;
  states: any = this.helper.selectState(this.country[0]);

  // Select the state based on country
  selectState(){
    this.states = this.helper.selectState(this.profileForm.value.country);
  }

  getuserDetails(){
    // getting parameter from the route url
    this.userId = this.route.snapshot.paramMap.get('id');

    // getting the user details 
    this.auth.getUserById(this.userId).subscribe({ // subscribe consume the observer emitted by the getUserById
       next:(value)=>{ // successfull
         // set the update form
         this.updatedForm(value);
       },
       error:(error)=>{ // failed
         console.log(error);
       }
    })
  }

  // set the update form
  updatedForm(userDetails:any){
    // console.log(userDetails);
    
      // Initialize the empty form
      this.profileForm = this.fb.group({
        name:[userDetails?.name,[Validators.required]],
        email:[userDetails?.email,[Validators.required,Validators.email]],
        age:[userDetails?.age,[Validators.required]],
        country:[userDetails?.location?.country],
        state:[userDetails?.location?.state],
        profession:[userDetails?.profession],
    });
  }

  // profile form
  submitProfile(){
    if(!this.profileForm.invalid){
      let body = {
        id:this.userId,
        name:this.profileForm.value.name,
        email:this.profileForm.value.email,
        age:this.profileForm.value.age,
        location:{country:this.profileForm.value.country,state:this.profileForm.value.state},
        profession:this.profileForm.value.profession
      }

      // updating the user
      this.auth.updateRegisterUser(body).subscribe({ // subscribe consume the observer emitted by the updateRegisterUser
        next:(value)=>{ // successfull
          // load the form 
          this.getuserDetails();
          // show the msg
          this.updatemsg = value.msg;
        },
        error:(error)=>{ // fail
          console.log(error);
        }
      });
    }
  }
}
