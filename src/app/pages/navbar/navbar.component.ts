import { Component } from '@angular/core';
import { DataServiceService } from '../../_services/data-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FoodService } from '../../_services/food.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userName: string = '';
  showList: boolean = false;
  userData: any;
  cartItemCount: number = 0;

  constructor(private dataServ: DataServiceService, private foodServ: FoodService) {
    this.getUserData();
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
