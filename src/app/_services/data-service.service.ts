import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { FoodService } from './food.service';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  userInfo: any;
  hotelInfo:any;
  private cartItems: any[] = [];

  private userDataSubject = new BehaviorSubject<any>(null);
  userData$ = this.userDataSubject.asObservable();

  private hotelDataSubject = new BehaviorSubject<any>(null);
  hotelData$ = this.userDataSubject.asObservable();

  constructor(private authServ: AuthService, private router: Router, private foodServ: FoodService) { }

  private sidebarState = new BehaviorSubject<boolean>(false);
  // sidebarState = this.sidebarOpen.asObservable();

  public cartCount = new BehaviorSubject<number>(0);

  public itemPrice = new BehaviorSubject<number>(0);

  getCartCount(): Observable<number> {
    return this.cartCount.asObservable();
  }

  getItemPrice(): Observable<number> {
    return this.itemPrice.asObservable();
  }

  getUserInfo() {
    if (typeof window !== 'undefined' && typeof localStorage !== undefined) {
      let userData = localStorage?.getItem("userData");
      if (userData) {
        this.userInfo = JSON.parse(userData);
        this.userDataSubject.next(this.userInfo);
        return this.userInfo;
      }
    }
  }

  setUserInfo(userData: any) {
    if (typeof window !== 'undefined' && typeof localStorage !== undefined) {
      localStorage?.setItem("userData", JSON.stringify(userData));
      this.userDataSubject.next(userData);
    }
  }

  getHotelInfo() {
    if (typeof window !== 'undefined' && typeof localStorage !== undefined) {
      let hotelData = localStorage?.getItem("hotelData");
      if (hotelData) {
        this.hotelInfo = JSON.parse(hotelData);
        this.hotelDataSubject.next(this.hotelInfo);
        return this.hotelInfo;
      }
    }
  }

  setHotelInfo(hotelData: any) {
    if (typeof window !== 'undefined' && typeof localStorage !== undefined) {
      localStorage?.setItem("hotelData", JSON.stringify(hotelData));
      this.hotelDataSubject.next(hotelData);
    }
  }

  clearUserInfo() {
    this.authServ.logout();
    this.router.navigate(['/login']);
  }

  toggleSidebar() {
    this.sidebarState.next(!this.sidebarState.value);
  }

  getSidebarState() {
    return this.sidebarState.asObservable();
  }

  resetCartCount() {
    this.cartCount.next(0);
  }

  resetItemPrice() {
    this.itemPrice.next(0);
  }
}
