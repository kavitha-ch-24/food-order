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
  foodLists: any[] = [];
  spinner: boolean = true;
  selectedTab: any = null;
  tabItemList: any[] = [];
  filteredFoodLists: any[] = [];
  cartButton: { [key: string]: boolean } = {};
  quantity: number = 1;
  userData: any;
  active: string = '';
  itemId: any;
  quantityArray: any[] = [];

  constructor(private ar: ActivatedRoute, private dataServ: DataServiceService, private foodServ: FoodService, private primeCon: PrimeNGConfig, private msgServ: MessageService) { }

  ngOnInit(): void {
    this.getItemList();
    this.userData = this.dataServ.getUserInfo()?.data;
    this.cartCountCheck();
  }

  getItemList() {
    this.foodServ.getFoodItemsList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.spinner = false;
        this.foodLists = res.data;
        this.filteredFoodLists = this.foodLists;
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

  foodTabList(name: any, other?: string) {
    this.selectedTab = other ? [name, other] : [name];
    if (!name) {
      this.filteredFoodLists = this.foodLists;
      this.selectedTab = null;
    } else {
      this.filteredFoodLists = this.foodLists.filter(p => {
        return this.selectedTab.includes(p.category.toLowerCase());
      });
    }
  }

  addToCart(data: any, cartState?: string) {
    // console.log(data);
    const itemInCart = this.filteredFoodLists.find(item => item._id === data._id);

    let itemData = {
      itemId: data._id,
      userId: this.userData.id,
      itemCategory: data.category,
      itemPrice: data.price,
      itemImageUrl: data.image_url,
      itemType: data.food_type,
      quantity: 1,
      itemName: data.itemName,
      type: cartState ? cartState : 'add'
    }

    if (itemInCart) {
      this.cartButton[data._id] = true;
      // console.log('Item added to cart:', data._id);
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

  cartCountCheck() {
    let userId = this.userData?.id;
    this.foodServ.cartCountCheck(userId).subscribe({
      next: (res: any) => {
        console.log(res, "cart count");
        this.quantityArray = res.data;
        console.log(this.quantityArray);
        if (this.quantityArray.length > 0) {
          let totalQuantity = 0;
          this.quantityArray.forEach((item: any) => {
            totalQuantity += item.quantity;
          });
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
}
