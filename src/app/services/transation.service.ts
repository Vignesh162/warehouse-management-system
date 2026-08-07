import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransationService {

  private apiUrl = 'https://simple-warehouse-tracker.onrender.com';
  constructor(private http : HttpClient) {}

  getTransaction(token : any){
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    })

    return this.http.get<any>(`${this.apiUrl}/api/transactions` , { headers })

  }

}
