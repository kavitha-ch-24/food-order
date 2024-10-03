import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.isLoggedIn());

  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // private isLoggedIn(): boolean {
  //   if (localStorage !== undefined) {
  //     return localStorage.getItem('isLoggedIn') === 'true';
  //   }
  //   return false;
  // }

  private isLoggedIn(): boolean {
    try {
      if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        return localStorage.getItem('isLoggedIn') === 'true';
      }
    } catch (error) {
      console.error('Error accessing localStorage:', error);
    }
    return false; 
  }

  login() {
    try {
      localStorage.setItem('isLoggedIn', 'true');
    } catch (error) {
      console.error(error);
    }
    this.loggedIn.next(true);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.loggedIn.next(false);
  }
}
