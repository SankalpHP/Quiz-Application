import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  
  userName:any;
  examRecords:any;
  attemptedQuestion:any[] = [];
  unattemptedQuestions:any[] = [];
 
  // Inject the classes constructor injection
  constructor(private activeRouter:ActivatedRoute,private reports:ReportsService){}

  ngOnInit(){

    // getting token from localstorage
    const token = localStorage.getItem('token');

    if(token != null){
      const payload = JSON.parse(atob(token?.split('.')[1]));
      this.userName = payload.name;

      // getting the parameter from the url
      this.activeRouter.paramMap.subscribe(params=>{
        // get the records
        this.getRecord({userId:payload.id,examId:params.get('id')})
      })
    }
  }


   // getting quize record
  getRecord(attempted:any){
    const body = {
      userId:attempted.userId,
      examId:attempted.examId,
    }
    // http call for getting attempted question
    this.reports.getattemptedQuestion(body).subscribe({ // subscribe consume the observer emitted by the getattemptedQuestion
      next:(value)=>{
        this.examRecords = value;
        // console.log(this.examRecords);
        this.attemptedQuestion = this.examRecords.attemptQuestions;
        this.unattemptedQuestions = this.examRecords.unattemptedQuestions;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
