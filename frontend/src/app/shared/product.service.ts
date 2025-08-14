import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environment';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category_id?: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private http: HttpClient) {}
  list(): Observable<Product[]> { return this.http.get<Product[]>(`${environment.apiUrl}/products`); }
  create(data: Product): Observable<Product> { return this.http.post<Product>(`${environment.apiUrl}/products`, data); }
  update(id: number, data: Partial<Product>): Observable<Product> { return this.http.put<Product>(`${environment.apiUrl}/products/${id}`, data); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${environment.apiUrl}/products/${id}`); }
}
