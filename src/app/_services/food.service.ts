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
}
