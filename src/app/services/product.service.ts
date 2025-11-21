import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from './storage.service';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  sku: string;
  category: string;
  imageUrl?: string;
  averageRating?: number;
  reviewCount?: number;
  lowStockThreshold?: number;
  isActive?: boolean;
}

const API_URL = 'http://localhost:8080/api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private storageService: StorageService) { }

  getAll(): Observable<any> {
    return this.http.get(API_URL, { headers: this.getAuthHeaders() });
  }

  get(id: any): Observable<any> {
    return this.http.get(`${API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }

  create(data: any): Observable<any> {
    // Data should be FormData
    return this.http.post(API_URL, data, { headers: this.getAuthHeaders(true) });
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, data, { headers: this.getAuthHeaders(true) });
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`, { headers: this.getAuthHeaders() });
  }

  private getAuthHeaders(isMultipart: boolean = false): HttpHeaders {
    const user = this.storageService.getUser();
    let token = user ? user.token : '';
    let headersConfig: any = {
      'Authorization': `Bearer ${token}`
    };

    // For FormData, we should NOT set Content-Type, browser does it automatically with boundary
    if (!isMultipart) {
      headersConfig['Content-Type'] = 'application/json';
    }

    return new HttpHeaders(headersConfig);
  }
}
