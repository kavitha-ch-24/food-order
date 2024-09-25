import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../_services/data-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  itemClick: boolean = false;

  constructor(private ar: ActivatedRoute, private dataServ: DataServiceService) { }

  ngOnInit(): void {
    this.ar.url.subscribe((params) => {
      if (params[0].path === 'dashboard') {
        this.dataServ.setItemClick(this.itemClick);
      }
    });
  }

}
