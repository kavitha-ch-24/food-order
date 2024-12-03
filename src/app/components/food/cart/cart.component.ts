import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../../_services/food.service';
import { DataServiceService } from '../../../_services/data-service.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ToastModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [MessageService]
})
export class CartComponent {
  spinner: boolean = true;
  itemsArray: any[] = [];
  userData: any;
  cartButton: { [key: string]: boolean } = {};
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private foodServ: FoodService, private dataServ: DataServiceService, private msgServ: MessageService) { }

  ngOnInit(): void {
    this.userData = this.dataServ.getUserInfo()?.data;
    this.cartCountCheck();
  }

  cartCountCheck() {
    let userId = this.userData?.id;
    this.foodServ.cartCountCheck(userId).subscribe({
      next: (res: any) => {
        // console.log(res, "cart count");
        this.spinner = false;
        this.itemsArray = res.data;
        // console.log(this.itemsArray,"itemArray");
        if (this.itemsArray.length > 0) {
          let totalQuantity = 0;
          let sum=0;
          this.itemsArray.forEach((item: any) => {
            sum=sum+(item.quantity*item.itemPrice)
            // console.log(sum,"this.totalPrice")
            totalQuantity += item.quantity;
          });
          this.totalPrice=sum;
          this.dataServ.cartCount.next(totalQuantity);
        } else {
          this.dataServ.cartCount.next(0);
        }
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

  addToCart(data: any, cartState?: string) {
    const itemInCart = this.itemsArray.find(item => item._id === data._id);

    let itemData = {
      itemId: data.itemId,
      userId: data.userId,
      itemCategory: data.itemCategory,
      itemPrice: data.price,
      itemImageUrl: data.itemImageUrl,
      itemType: data.itemType,
      quantity: data.quantity,
      itemName: data.itemName,
      type: cartState ? cartState : 'add'
    }

    if (itemInCart) {
      this.cartButton[data._id] = true;

      this.foodServ.addToCart(itemData).subscribe({
        next: (res: any) => {
          console.log(res);
          this.cartCountCheck();
        }, error: (err: any) => {
          console.log(err);
          if (err.status === 404) {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
          } else {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.msg });
          }
        }
      })
    } else {
      console.log('Item not found in filtered list');
      this.msgServ.add({ severity: 'warn', summary: 'Item Not Found', detail: 'Item is not available in the current filtered list' });
    }
  }
}
