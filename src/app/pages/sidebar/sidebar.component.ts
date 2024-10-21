import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataServiceService } from '../../_services/data-service.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  dashboard: boolean = false;
  item: boolean = false;
  profile: boolean = false;
  value: string = '';

  constructor(private dataServ: DataServiceService) { }

  ngOnInit(): void { }

  activeMenu: number | null = null;
  activeSubmenu: number | null = null;

  setActiveMenu(menuIndex: number) {
    if (this.activeMenu === menuIndex) {
      this.activeMenu = null;
    } else {
      this.activeMenu = menuIndex;
      this.activeSubmenu = null;
    }
  }

  setActiveSubmenu(submenuIndex: number) {
    this.activeSubmenu = submenuIndex;
  }

  toggleSidebar() {
    this.dataServ.toggleSidebar();
  }
}
