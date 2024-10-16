import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DataServiceService } from '../../../_services/data-service.service';
import { FoodService } from '../../../_services/food.service';
import { ToastModule } from 'primeng/toast';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-items-list',
  standalone: true,
  imports: [ToastModule, CommonModule, RouterModule],
  templateUrl: './items-list.component.html',
  styleUrl: './items-list.component.css',
  providers: [MessageService]
})
export class ItemsListComponent {
  itemClick: boolean = false;
  foodLists: any[] = [];
  spinner:boolean = true;

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
        this.spinner = false;
        this.foodLists = res.data;
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
