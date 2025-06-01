import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrl: './adminpanel.component.scss'
})
export class AdminpanelComponent {

   userDetails:any = null;
  
  // Inject the services or class constructor injection
  constructor(private auth:AuthService){}

  ngOnInit(){
    this.auth.getAllusers().subscribe({ // subscribe method consume the observer return by the getAllusers.
      next:(value)=>{ // successfull
        // console.log(value);
        this.userDetails = value;
      },
      error:(error)=>{ // failed
        console.log(error);
      }
    });
  }
}
