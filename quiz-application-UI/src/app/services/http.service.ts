import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  
  // Inject httpClient service for api method calling
  constructor(private http:HttpClient) { }

  URL:String = "http://localhost:3000/";

  // =============================================================Exam Http Methods===============================================================/
  
  // get all exams 
  getExams():Observable<any>{ // returns the Observable of type any
    return this.http.get(`${this.URL}exam/exams`);
  }

  // add exam 
  addExams(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.post(`${this.URL}exam/exams`,body)
  }

  // get exam by Id
  getExamById(id:string):Observable<any>{ // returns the Observable of type any
    return this.http.get(`${this.URL}exam/${id}`);
  }

  // update exam
  updateExams(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.put(`${this.URL}exam/exams`,body);
  }

  // delete exam
  deleteExams(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.delete(`${this.URL}exam/exams`,{body})
  }
  
  // =============================================================Question Http Methods===============================================================/
  
  // save question
  saveQuestion(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.post(`${this.URL}question/question`,body);
  }

  // get question for exam
  getQuestion(id:any):Observable<any>{ // returns the Observable of type any
    return this.http.get(`${this.URL}question/${id}`);
  }

  // update question for exam
  updateQuestion(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.put(`${this.URL}question/question`,body);
  }

  // delete question for exam
  deleteQuestion(body:any):Observable<any>{ // returns the Observable of type any
    return this.http.delete(`${this.URL}question/question`,{body});
  }

  // =============================================================Quiz Http Methods===============================================================/

  // save/update the quiz
  saveQuiz(body:any):Observable<any>{
    return this.http.post(`${this.URL}quiz/saveQuiz`,{body});
  }

  // quiz duration
  getDuration(id:any):Observable<any>{
    return this.http.get(`${this.URL}quiz/${id}`);
  }
}
