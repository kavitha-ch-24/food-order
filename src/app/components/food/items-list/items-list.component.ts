import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataServiceService } from '../../../_services/data-service.service';
import { FoodService } from '../../../_services/food.service';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig, MessageService } from 'primeng/api';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [ToastModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
  providers: [MessageService]
})
export class ItemsListComponent {
  itemClick: boolean = false;

  constructor(private ar: ActivatedRoute, private dataServ: DataServiceService, private foodServ: FoodService, private primeCon: PrimeNGConfig, private msgServ: MessageService) { }

  ngOnInit(): void {
    this.ar.url.subscribe((params) => {
      if (params[0].path === 'food') {
        // console.log(params);
        this.itemClick = true;
        this.dataServ.setItemClick(this.itemClick);
      }
    });
    this.getItemList();
  }

  getItemList() {
    this.foodServ.getFoodItemsList().subscribe({
      next: (res: any) => {
        console.log(res);
      }, error: (err: any) => {
        console.log(err);
        if (err.status === 404) {
          this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
        } else {
          this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.msg });
        }
      }
    })
  }
}
