import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.developemnt';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.api_url;

  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<any> {
    return this.http.post(this.apiUrl + '/user/registerUser', data);
  }
}
