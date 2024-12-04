import { Component } from '@angular/core';
import { HotelService } from '../../../_services/hotel.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [ToastModule, CommonModule],
  templateUrl: './hotel-list.component.html',
  styleUrl: './hotel-list.component.css',
  providers: [MessageService]
})
export class HotelListComponent {
  hotels: any[] = [];
  spinner: boolean = true;

  constructor(private hotelServ: HotelService, private msgServ: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getHotelList();
  }

  getHotelList() {
    this.hotelServ.getHotelList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.hotels = res.data;
        console.log(this.hotels);
        this.spinner = false;
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

  descMoreLess(item: any) {
    item.showFullDesc = !item.showFullDesc;
  }

  hotelItems(data: any) {
    console.log(data);
    this.hotelServ.getItemsByHotelId(data._id).subscribe({
      next: (res: any) => {
        console.log(res);
        setTimeout(() => {
          this.router.navigate(['/food/list/' + data._id]);
        }, 1000);
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
