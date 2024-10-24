import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.developemnt';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  getFoodItemsList() {
    return this.http.get(this.apiUrl + '/item/getItem');
  }

  createItem(data: any): Observable<any> {
    let apiData = new FormData();
    apiData.append('itemName', data.itemName);
    apiData.append('description', data.description);
    apiData.append('image_url', data.image_url);
    apiData.append('price', data.price);
    apiData.append('food_type', data.food_type);
    apiData.append('category', data.category);
    apiData.append('created_by', data.created_by);
    return this.http.post(this.apiUrl + '/item/addItem', apiData);
  }

  updateItem(data: any): Observable<any> {
    return this.http.put(this.apiUrl + `/item/editItem/${data.id}`, data);
  }

  updateItemImage(data: any): Observable<any> {
    let imgData = new FormData();
    imgData.append('image_url', data.image_url);
    return this.http.put(this.apiUrl + `/item/editImage/${data.id}`, imgData);
  }

  addToCart(data: any): Observable<any> {
    console.log(data, "api data");
    return this.http.post(this.apiUrl + '/cart/addCart', data);
  }

  cartCountCheck(id: any): Observable<any> {
    return this.http.get(this.apiUrl + `/cart/cartDetails/${id}`);
  }
}
