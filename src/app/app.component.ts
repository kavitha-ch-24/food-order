import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { DataServiceService } from './_services/data-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, SidebarComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FoodOrder';
  showMenu: boolean = false;
  sidebar: boolean = false;

  constructor(private router: Router, private dataServ: DataServiceService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        let sideMenu = (event.urlAfterRedirects === '/login' || event.urlAfterRedirects === '/user/register' || event.urlAfterRedirects === '/hotel/register' || event.urlAfterRedirects === '/hotel/login');
        this.showMenu = !sideMenu;
        // console.log(this.showMenu);
      }
    })
  }

  ngOnInit() {
    this.dataServ.getSidebarState().subscribe((state) => {
      this.sidebar = state;
    });
  }

  toggleSidebar() {
    this.dataServ.toggleSidebar();
  }
}
