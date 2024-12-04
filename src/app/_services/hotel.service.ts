import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.developemnt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  getHotelList(): Observable<any> {
    return this.http.get(this.apiUrl + '/hotel/hotelDetails');
  }

  getItemsByHotelId(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/item/getItem/${id}`);
  }
}
