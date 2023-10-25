import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }
  getAllOrders() {
    return this.http.get<any>(
      'http://localhost:8082/orders/get')
      .pipe(map(response => {
        console.log('res',response)
        return response;
      }));
  }
  createOrderFromMenu(menuName: string, email: string,  token: string, currency: string) {
    const params = {
      email,
      token,
      currency
    };
    return this.http.post<any>(`http://localhost:8082/orders/menu/${menuName}`, null, {params})
      .pipe(map(response => {
        return response;
      }));

  }
  public deleteOrder(id: any) : Observable<void> {
      return this.http.delete<void>(`http://localhost:8082/orders/orders/${id}`);
    }

  getQRCodeImage(id: number): Observable<Blob> {
    const headers = new HttpHeaders({ 'Accept': 'image/png' });
    return this.http.get(`http://localhost:8082/orders/orders/${id}/qrcode`, { headers, responseType: 'blob' });
  }


  statisticmeal(): Observable<string[]> {
    return this.http.get<any[]>('http://localhost:8082/orders/get')
      .pipe(
        map(orders => orders.map(order => order.menu.name))
      );
  }


    }
