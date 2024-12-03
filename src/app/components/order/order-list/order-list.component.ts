import { Component } from '@angular/core';
import { OrderService } from '../../../_services/order.service';
import { DataServiceService } from '../../../_services/data-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
  providers: [MessageService]
})
export class OrderListComponent {
  orders: any[] = [];
  userData: any;
  spinner: boolean = true;

  constructor(private orderServ: OrderService, private dataServ: DataServiceService, private msgServ: MessageService) { }

  ngOnInit(): void {
    this.userData = this.dataServ.getUserInfo()?.data;
    // console.log(this.userData);
    this.getOrderList();
  }

  getOrderList() {
    let id = this.userData.id;
    this.orderServ.getOrderList(id).subscribe({
      next: (res: any) => {
        console.log(res, "order list output");
        console.log(res.data, "order list");
        this.orders = res.data;
        this.spinner = false;
      }, error: (err: any) => {
        if (err.status === 404) {
          this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
        } else {
          this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.msg });
        }
      }
    })
  }
}
