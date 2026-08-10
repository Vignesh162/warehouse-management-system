import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TransactionHistory } from '../interfaces/transation';
import { ProductResponse, TransactionData, TransactionResponse } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class TransationService {

  // Stores the base URL of the warehouse management backend API.
  private apiUrl : string = 'https://simple-warehouse-tracker.onrender.com';

  constructor(private http : HttpClient) {}
   
  /**
 * Fetches transaction history.
 * @param token Authentication token.
 */
  getTransaction(token : string) : Observable<TransactionHistory>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    })
    return this.http.get<TransactionHistory>(`${this.apiUrl}/api/transactions` , { headers })
  }

  /**
 * Fetches a product by ID.
 * @param id Product ID.
 * @param token Authentication token.
 */
    getSingleProduct(id : string ,  token : string) : Observable<ProductResponse>{
      const headers = new HttpHeaders({
        Authorization : `Bearer ${token}`
      })
      return this.http.get<ProductResponse>(`${this.apiUrl}/api/products/${id}` , { headers }  );
    }
     
    /**
 * Updates product stock.
 * @param id Product ID.
 * @param data Transaction details.
 * @param token Authentication token.
 */
    postOprationProduct(id : string  , data : TransactionData , token : string) : Observable<TransactionResponse>{
      
      const headers = new HttpHeaders({
        Authorization : `Bearer ${token}`
      })
      return this.http.patch<TransactionResponse>(`${this.apiUrl}/api/products/${id}/stock` ,data ,  {headers}  )
    }

}
