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
  itemClick: boolean = false;

  constructor(private dataServ: DataServiceService) { }

  ngOnInit(): void {
    this.dataServ.itemClick$.subscribe((value) => {
      this.itemClick = value;
    });
  }

  dashboardAccess() {
    this.dashboard = !this.dashboard;
  }

  menuItems() {
    this.item = !this.item;
  }
}
