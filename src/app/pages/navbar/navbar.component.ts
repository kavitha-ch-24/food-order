import { Component } from '@angular/core';
import { DataServiceService } from '../../_services/data-service.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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

  constructor(private dataServ: DataServiceService) {
    this.getUserData();
  }

  getUserData() {
    this.userName = this.dataServ.getUserInfo()?.data?.name;
  }

  onMouseEnter() {
    this.showList = true;
  }

  onMouseLeave() {
    this.showList = false;
  }

  logout(){
    this.dataServ.clearUserInfo();
  }
}
