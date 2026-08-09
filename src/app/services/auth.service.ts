import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../interfaces/register';
import { Observable } from 'rxjs';
import { Login } from '../interfaces/login';
import { LoginResponse } from '../interfaces/login-response';
import { HttpResponse } from '@angular/common/http';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    // Stores the base URL of the warehouse management backend API.
  private apiUrl : string = 'https://simple-warehouse-tracker.onrender.com'

  constructor(private http: HttpClient) { }

  /**
   * Registers a new user using the provided registration data.
   *
   * @param data Contains the user's registration details.
   * @return Observable containing the HTTP response of the registration request.
   */
  postRegister(data: Register): Observable<HttpResponse<RegisterResponse>> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/api/users/register`, data, { observe: 'response' })
  }

  /**
 * Logs in a user using the provided login credentials.
 *
 * @param data Contains the user's username and password.
 * @return Observable containing the HTTP response of the login request.
 */
  postLogin(data: Login): Observable<HttpResponse<LoginResponse>> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/api/users/login`, data, { observe: 'response' })
  }

}
