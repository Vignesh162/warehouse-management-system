import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://simple-warehouse-tracker.onrender.com'

  constructor(private http : HttpClient) { }

  postRegister(data : Register) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/users/register` , data , { observe: 'response'})
  }
  postLogin(data : Login) : Observable<any>{
    return this.http.post(`${this.apiUrl}/api/users/login` , data , { observe: 'response'})
  }

}
