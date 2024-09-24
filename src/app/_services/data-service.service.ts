import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  constructor() { }

  private itemClickSubject = new BehaviorSubject<boolean>(false);
  itemClick$ = this.itemClickSubject.asObservable();

  setItemClick(value: boolean) {
    this.itemClickSubject.next(value);
  }

  getUserInfo() {
    if (typeof window !== 'undefined' && typeof localStorage !== undefined) {
      const userData = localStorage?.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        this.userDataSubject.next(parsedUserData);
        return parsedUserData;
      }
    }
  }

  setUserInfo(userData: any) {
    if (typeof window !== 'undefined' && typeof localStorage !== undefined) {
      localStorage?.setItem("userData", JSON.stringify(userData));
      this.userDataSubject.next(userData);
    }
  }

  clearUserInfo() {
    localStorage.removeItem("userData");
    this.userDataSubject.next(null);
  }
}
