import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  // Inject httpClient service for api method calling
  constructor(private http:HttpClient) { }

  URL:String = "http://localhost:3000/";
 
  // user Login
  Login(body:any):Observable<any>{ // returns the observer of any type
    return this.http.post(`${this.URL}auth/login`,body);
  }

  // user register
  Register(body:any):Observable<any>{
    return this.http.post(`${this.URL}auth/register`,body);
  }

  // get user by Id
  getUserById(id:any):Observable<any>{
    return this.http.get(`${this.URL}auth/${id}`);
  }

  // update register user
  updateRegisterUser(body:any):Observable<any>{
    return this.http.post(`${this.URL}auth/registerUpdate`,body);
  }

  // get all the users
  getAllusers():Observable<any>{ // returns observer of any type
    return this.http.post(`${this.URL}auth/users`,'');
  }

  // get user
  getUsername(body:any):Observable<any>{ // returns observer of any type
    return this.http.post(`${this.URL}auth/username`,body);
  }
}
