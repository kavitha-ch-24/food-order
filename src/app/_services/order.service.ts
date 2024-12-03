import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.developemnt';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  addOrderData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/order/addOrderDetails', data);
  }

  getOrderList(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/order/getOrderDetails/${id}`);
  }
}
