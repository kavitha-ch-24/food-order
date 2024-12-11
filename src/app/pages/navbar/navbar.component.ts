import { Component } from '@angular/core';
import { DataServiceService } from '../../_services/data-service.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { FoodService } from '../../_services/food.service';
import { stringify } from 'node:querystring';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string = '';
  hotelName: string = '';
  showList: boolean = false;
  userData: any;
  hotelData: any;
  cartItemCount: number = 0;
  hotelNav: boolean = false;

  constructor(private dataServ: DataServiceService, private foodServ: FoodService, private router: Router) {
    const currentUrl = this.router.url;
    this.hotelNav = (currentUrl === '/hotel/create-item');

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.hotelNav = (event.urlAfterRedirects === '/hotel/create-item');
      }
    });
    this.getUserData();
    this.getHotelData();
  }

  ngOnInit(): void {
    this.dataServ.getCartCount().subscribe(count => {
      this.cartItemCount = count;
      if (!count) {
        this.cartItemCount = 0;
      }
    });
  }

  getUserData() {
    this.userName = this.dataServ.getUserInfo()?.data?.name;
    this.userData = this.dataServ.getUserInfo()?.data;
  }

  getHotelData() {
    this.hotelName = this.dataServ.getHotelInfo()?.data?.name;
    this.hotelData = this.dataServ.getUserInfo()?.data;
  }

  onMouseEnter() {
    this.showList = true;
  }

  onMouseLeave() {
    this.showList = false;
  }

  logout() {
    this.dataServ.clearUserInfo();
    this.dataServ.resetCartCount();
  }

  toggleSidebar() {
    this.dataServ.toggleSidebar();
  }
}
