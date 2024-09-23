import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../_services/data-service.service';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css'
})
export class ItemsListComponent {
  itemClick: boolean = false;

  constructor(private ar: ActivatedRoute, private dataServ: DataServiceService) { }

  ngOnInit(): void {
    this.ar.url.subscribe((params) => {
      if (params[0].path === 'food') {
        // console.log(params);
        this.itemClick = true;
        this.dataServ.setItemClick(this.itemClick);
      }
    })
  }
}
