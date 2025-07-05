import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant, Item, OrderRequest } from '../models/order.model';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.baseUrl}/restaurants`);
  }

  getItems(restaurantGuid: string): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseUrl}/restaurants/${restaurantGuid}/items`);
  }

  submitOrder(order: OrderRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/orders`, order);
  }
}
