import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportsService } from '../services/reports.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-adminpanel-reports',
  templateUrl: './adminpanel-reports.component.html',
  styleUrl: './adminpanel-reports.component.scss'
})
export class AdminpanelReportsComponent {

  data:any;
  examRecords:any;
  attemptedQuestion:any[] = [];
  unattemptedQuestions:any[] = [];
  
  // Inject the classes or services constructor injection
  constructor(private router:Router, private reports:ReportsService, private location: Location){
    // receiving the data from the router navigation extra object
     this.data = this.router.getCurrentNavigation()?.extras.state?.['response'];
    //  console.log(this.data);  
  }

  ngOnInit(){
    this.getRecord(this.data);
  }

  // getting quize record
  getRecord(attempted:any){
    const body = {
      userId:attempted.userId,
      examId:attempted.examId,
    }
    // http call for getting attempted question
    this.reports.getattemptedQuestion(body).subscribe({ // subscribe consume the observer emitted by the getattemptedQuestion
      next:(value)=>{ // successfully
        this.examRecords = value;
        // console.log(this.examRecords);
        this.attemptedQuestion = this.examRecords.attemptQuestions;
        this.unattemptedQuestions = this.examRecords.unattemptedQuestions;
      },
      error:(error)=>{ // failed
        console.log(error);
      }
    })
  }

  // back browser btn
   goBack(): void {
      this.location.back();
    }
}
