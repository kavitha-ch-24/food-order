import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../_services/data-service.service';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {
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
