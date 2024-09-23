import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  constructor() { }

  private itemClickSubject = new BehaviorSubject<boolean>(false);
  itemClick$ = this.itemClickSubject.asObservable();

  setItemClick(value: boolean) {
    this.itemClickSubject.next(value);
  }
}
