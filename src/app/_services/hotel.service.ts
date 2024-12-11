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

  registerHotel(data: any): Observable<any> {
    let apiData = new FormData();
    apiData.append('hotel_name', data.hotel_name);
    apiData.append('hotel_email', data.hotel_email);
    apiData.append('password', data.password);
    apiData.append('hotel_street', data.hotel_street);
    apiData.append('hotel_category', data.hotel_category);
    apiData.append('hotel_area', data.hotel_area);
    apiData.append('hotel_locality', data.hotel_locality);
    apiData.append('hotel_city', data.hotel_city);
    apiData.append('hotel_pincode', data.hotel_pincode);
    apiData.append('hotel_img', data.hotel_img);
    return this.http.post(this.apiUrl + '/hotel/register', apiData);
  }

  hotelLogin(data: any): Observable<any> {
    return this.http.post(this.apiUrl + `/hotel/login`, data);
  }

  getHotelDataById(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/hotel/hotelProfile/${id}`);
  }
}
