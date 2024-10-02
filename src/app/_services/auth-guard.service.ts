import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authServ: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (this.authServ.isAuthenticated()) {
      return true; 
    } else {
      this.router.navigate(['/login']); 
      return false; 
    }
  }
}
