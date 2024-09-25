import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../_services/data-service.service';

@Component({
  selector: 'app-user-desc',
  standalone: true,
  imports: [],
  templateUrl: './user-desc.component.html',
  styleUrl: './user-desc.component.css'
})
export class UserDescComponent {
  itemClick: boolean = false;

  constructor(private ar: ActivatedRoute, private dataServ: DataServiceService) { }

  ngOnInit(): void {
    this.ar.url.subscribe((params) => {
      // console.log(params[1]);
      if (params[1].path === 'desc') {
        // this.itemClick = true;
        this.dataServ.setItemClick(this.itemClick);
      }
    })
  }
}
