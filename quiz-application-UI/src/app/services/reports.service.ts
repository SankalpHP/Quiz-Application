import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  // Inject httpClient service for api method calling
  constructor(private http:HttpClient) { }

  URL:String = "http://localhost:3000/";

  // attempted exam
  attemptedExams(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.post(`${this.URL}attempted/attemptedExam`,body);
  }

  // get the exams
  getattemptedExams(userId:any):Observable<any>{ // returns the Observable of type any
    return this.http.get(`${this.URL}attempted/${userId}`);
  }

  // get attempted questions
  getattemptedQuestion(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.post(`${this.URL}attempted/attemptedQuestion`,body);
  }
}
