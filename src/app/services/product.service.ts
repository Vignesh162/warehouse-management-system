import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardResponse } from '../interfaces/dashboard';
import { DeleteProductResponse, postProductResponseData, Product, ProductList, ProductResponse, UpdateProductResponse } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Stores the base URL of the warehouse management backend API.
  private apiUrl : string = 'https://simple-warehouse-tracker.onrender.com';

  /**
  * Creates an instance of ProductService.
  * Injects HttpClient for communicating with the backend API.
  * @class
  */
  constructor(private http: HttpClient) { }

  /**
 * Retrieves the list of products from the backend.
 * Sends the authentication token in the request header to authorize the API request.
 * @param {string} token Authentication token used to authorize the request.
 * @return {Observable} Observable containing the product list response.
 */
  getProduct(token: string): Observable<ProductList> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<ProductList>(`${this.apiUrl}/api/products`, { headers });
  }

  /**
   * Retrieves a single product using its ID.
   * Sends the authentication token in the request header to authorize the API request.
   * @param {string} id Unique identifier of the product to retrieve.
   * @param {string | null} token Authentication token used to authorize the request.
   * @return {Observable} Observable containing the requested product.
   */
  getSingleProduct(id: string, token: string | null): Observable<ProductResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get<ProductResponse>(`${this.apiUrl}/api/products/${id}`, { headers });
  }

  /**
  * Creates a new product in the warehouse system.
  * Sends product information and the authentication token to the backend API.
  * @param {Product} data Product information to be created.
  * @param {string | null} token Authentication token used to authorize the request.
  * @return {Observable} Observable containing the product creation response.
  */
  postProduct(data: Product, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.post<postProductResponseData>(`${this.apiUrl}/api/products`, data, { headers, observe: 'response' });
  }

  /**
 * Deletes a product using its ID.
 * Sends the authentication token to authorize the delete operation.
 * @param {string} id Unique identifier of the product to delete.
 * @param {string | null} token Authentication token used to authorize the request.
 * @return {Observable} Observable containing the delete operation response.
 */
  deleteProduct(id: string, token: string | null): Observable<DeleteProductResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.delete<DeleteProductResponse>(`${this.apiUrl}/api/products/${id}`, { headers });
  }

  /**
   * Updates an existing product using its ID.
   * Sends the updated product information and authentication token to the backend.
   * @param {string} id Unique identifier of the product to update.
   * @param {Product} data Updated product information.
   * @param {string | null} token Authentication token used to authorize the request.
   * @return {Observable} Observable containing the product update response.
   */
  updateProduct(id: string, data: Product, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.put<postProductResponseData>(`${this.apiUrl}/api/products/${id}`, data, { headers, observe: 'response' })
  }

  getDashboardData(token: string): Observable<DashboardResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.get<DashboardResponse>(`${this.apiUrl}/api/dashboard`, { headers });
  }

}  
