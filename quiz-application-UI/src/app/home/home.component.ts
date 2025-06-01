import { Component } from '@angular/core';
import { HttpService } from '../services/http.service';
import { ReportsService } from '../services/reports.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  Exams:any;
  userName:any;
  examId:any;
  payload:any;
  attemptedExamByUser:any;

  // Inject the HttpService (constructor injection)
  constructor(private http:HttpService,private report:ReportsService){}

  ngOnInit(){
    // get the token from browser localStorage 
    const token = localStorage.getItem('token');
    if(token != null){
      this.payload = JSON.parse(atob(token.split('.')[1]));
      this.userName = this.payload.name
    }

     // get exam
     this.getExams();
  }
  
  // Getting the exams
  getExams(){
    // getting the exam
    this.http.getExams().subscribe({ // subscribe consume the observer emitted by getExams
        next:(value)=>{ // successfully
          // console.log(value);
          this.Exams = value;
          
          if (this.Exams.msg === "No exams found!") {
              this.Exams = false;
          }
        },
        error:(error)=>{ // failure
          console.log(error);
        }
    })
  }

  // attempted exam
  attemptedExam(){
    // setting attempted boolean true
    this.attemptedExamByUser.attempted = true;
    // setting the userId
    this.attemptedExamByUser.userId = this.payload.id;
    // saving the attempted exam
    this.report.attemptedExams(this.attemptedExamByUser).subscribe({ // subscribe methods consume the observer emitted by the attemptedExams
        next:(value)=>{ // successfull
          // console.log(value);
        },
        error:(error)=>{ // error
          console.error(error);
        }
    });
  }

  // Start Exam By ID
  startExam(body:any){
    this.examId = body._id;
    this.attemptedExamByUser = body;
  }
}
