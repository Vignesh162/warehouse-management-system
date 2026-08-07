import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://simple-warehouse-tracker.onrender.com';
  constructor(private http : HttpClient) { }

  getProduct(token : any) : Observable <any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    })
    return this.http.get<any>(`${this.apiUrl}/api/products` , { headers }  );
  }
  
  getSingleProduct(id : any ,  token : any) : Observable <any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    })
    return this.http.get<any>(`${this.apiUrl}/api/products/${id}` , { headers }  );
  }

  postProduct(data : any , token : any) : Observable <any>{
  const headers = new HttpHeaders({
    Authorization : `Bearer ${token}`
  });
    return this.http.post<any>(`${this.apiUrl}/api/products` , data , { headers });
  }

  deleteProduct(id : any , token : any) : Observable <any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.apiUrl}/api/products/${id}`, { headers });
  }


  updateProduct(id : any , data : any , token : any ) : Observable <any>{
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.put<any>(`${this.apiUrl}/api/products/${id}`, data , { headers })
  }

  issueProduct(id : any , data : any , token : any ) : Observable <any> {
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    });
    return this.http.patch<any>(`${this.apiUrl}/api/products/${id}/stock` , data , { headers });
  }

  reciveProduct(id : any , data : any , token : any ) : Observable <any> {
    const headers = new HttpHeaders({
      Authorization : `Bearer ${token}`
    })
    return this.http.patch<any>(`${this.apiUrl}/api/products/${id}/stock` , data , { headers });
  }
  

}
