import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-adminpaneldetails',
  templateUrl: './adminpaneldetails.component.html',
  styleUrl: './adminpaneldetails.component.scss'
})
export class AdminpaneldetailsComponent {

  attemptedExam:any|undefined;
  showAttemptedExam:boolean = false;
  username:any;
  UserId:any;
  
  // Inject the classes or services constructor injection
  constructor(private activeRouter:ActivatedRoute, private reports:ReportsService, private router:Router, private auth:AuthService){
     // getting the parameter from the url
     this.activeRouter.paramMap.subscribe(param=>{
       this.UserId = param.get('id');

      // load the user name
      this.getUserName(this.UserId);

      // load the attempted exams
      this.loadAttemptedExams(this.UserId);
     })
  }

  // get attempted exams
  loadAttemptedExams(UserId:any){
    // get the attempted exams
      this.reports.getattemptedExams(UserId).subscribe({ // subscribe method consume the observer return by the getattemptedExams
        next:(value)=>{ // successfull
          // console.log(value);
          if(value.length != 0){
            this.attemptedExam = value;
            this.showAttemptedExam = true;
          }
        },
        error:(error)=>{ // failed
          console.log(error);
        }
      });
  }
  
  // get the object to adminpanel-report component
  sendId(userId:any,examId:any){
    // Router Navigation with state sending temperory data in router navigation state object
    this.router.navigate(['adminpanelReports'],{
      state:{
        response:{userId:userId,examId:examId},
      }
    })
  }
  
  // get the user name
  getUserName(_id:any){
    this.auth.getUsername({_id}).subscribe({ // subscribe method consume the observer emitted by the getusername
      next:(value)=>{
        // console.log(value);
        this.username = value.name;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }
}

