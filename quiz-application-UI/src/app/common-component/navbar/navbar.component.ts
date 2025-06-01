import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../../services/helper.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    
    paylaod:any;
    // admin access panel btn
    adminBtn:boolean = true;

    // Inject the class constructor injection
    constructor(private router:Router,private helper:HelperService){}

    ngOnInit(){
      // get the token from the browser localstorage
      const token = localStorage.getItem('token'); 
      
      if(token != null){
        // check is valid
        if(this.helper.isTokenExpired(token)){
           // Decoded JWT payload (assuming it's base64 encoded)
           this.paylaod = JSON.parse(atob(token.split('.')[1]));

          //  console.log(this.paylaod.role);
           
           if(this.paylaod.role[0] == "user" && this.paylaod.role[1] == "admin"){
              this.adminBtn = true;
           }else if(this.paylaod.role[0] == "user"){
              this.adminBtn = false;
           }
        }
      }
    }

    logOut(){
      // Remove the jwt token from browser's localstorage
        localStorage.removeItem('token'); 
      // navigate to registration
        this.router.navigate(['/registration']); 
    }
}
