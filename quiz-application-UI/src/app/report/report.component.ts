import { Component } from '@angular/core';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent {

  attemptedExam:any;
  result:any
  // Inject class or service
  constructor(private reports:ReportsService){}

  ngOnInit(){
    // getting the token from localstorage
    const token = localStorage.getItem('token');
    if(token != null){
      const payload =  JSON.parse(atob(token?.split('.')[1]));
      this.loadAttemptedExam(payload.id);
    }
  }

  // getting attempted exam
  loadAttemptedExam(UserId:any){
    // http call for attempted exam
    this.reports.getattemptedExams(UserId).subscribe({ // subscribe consume the observer emitted by the getattemptedExams
      next:(value)=>{ // successfull
        this.attemptedExam = value;
      },
      error:(error)=>{ // failed
        console.log(error);
      }
    })
  }

 
}
