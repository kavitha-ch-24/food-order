import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../../../_services/data-service.service';
import { FoodService } from '../../../_services/food.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { OrderService } from '../../../_services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ToastModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
  providers: [MessageService]
})
export class PaymentComponent {
  activeIndex: number | null = null;
  userData: any;
  billAmount: number = 0;
  itemsArray: any[] = [];
  selectedUpi: string = "";
  activeBgColor: string = "";
  address: any[] = [];
  totalPrice: number = 0;
  addressCard: boolean = false;
  addressCreateForm: FormGroup;
  itemId: any = null;
  dataVerify: boolean = false;
  selectedAddState: boolean = false;
  selectedAdd: any;

  constructor(private dataServ: DataServiceService, private foodServ: FoodService, private msgServ: MessageService, private orderServ: OrderService, private router: Router) {
    this.addressCreateForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      house_No: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      street: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pincode: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(6), Validators.maxLength(6)]),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      mobile_no: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)]),
      _id: new FormControl('')
    })
  }

  get myfc() {
    return this.addressCreateForm.controls;
  }

  ngOnInit(): void {
    this.userData = this.dataServ.getUserInfo().data;
    // console.log(this.userData);
    this.billPayment();
    this.deliveryAddress();
  }

  toggleAccordion(index: number): void {
    this.activeIndex = this.activeIndex === index ? null : index;
  }

  billPayment() {
    let userId = this.userData?.id;
    this.foodServ.cartCountCheck(userId).subscribe({
      next: (res: any) => {
        // console.log(res, "cart count");
        this.itemsArray = res.data;
        // console.log(this.itemsArray, "itemArray");
        if (this.itemsArray.length > 0) {
          let totalQuantity = 0;
          let sum = 0;
          this.itemsArray.forEach((item: any) => {
            sum = sum + (item.quantity * item.itemPrice);
            this.totalPrice = sum;
            // console.log(sum, "this.totalPrice")
            totalQuantity += item.quantity;
          });
          this.billAmount = sum;
          this.dataServ.cartCount.next(totalQuantity);
        } else {
          this.dataServ.cartCount.next(0);
        }
      }, error: (err: any) => {
        // console.log(err);
        if (err.status === 404) {
          this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
        } else {
          this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.msg });
        }
      }
    })
  }

  upiMethod(event: Event): void {
    this.selectedUpi = (event.target as HTMLInputElement).value;
  }

  checkPaymentOption(data: any) {
    this.activeBgColor = data;
    // console.log(data);
  }

  deliveryAddress() {
    this.foodServ.getDeliveryAddress(this.userData.id).subscribe({
      next: (res: any) => {
        // console.log(res.data);
        this.address = res.data;
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

  submitAdd() {
    if (this.itemId !== null) {
      this.editDeliveryAddress();
    } else {
      this.addAddress();
    }
  }

  addressDisplay() {
    this.addressCard = true;
  }

  addressHide() {
    this.addressCard = false;
  }

  addAddress() {
    this.dataVerify = true;
    this.addressCreateForm.get('userId')?.setValue(this.userData.id);
    // console.log(this.addressCreateForm.value);
    if (this.addressCreateForm.valid) {
      this.foodServ.addDeliveryAddress(this.addressCreateForm.value).subscribe({
        next: (res: any) => {
          // console.log(res);
          if (res.status === 200) {
            this.msgServ.add({ severity: 'success', summary: 'Address added', detail: res.message });
            this.addressCard = false;
            this.deliveryAddress();
          }
        }, error: (err: any) => {
          console.log(err);
          if (err.status === 404) {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
          } else {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.message });
          }
        }
      })
    } else {
      this.msgServ.add({ severity: 'error', summary: 'Invalid Form', detail: 'Please Fill data correctly' });
    }
  }

  deleteAddress(data: any) {
    if (window.confirm("Are you sure you want to delete this address?")) {
      // console.log(data);
      let id = data._id;
      this.foodServ.deleteDeliveryAddress(id).subscribe({
        next: (res: any) => {
          console.log(res, "delete delivery address");
          if (res.status === 200) {
            this.msgServ.add({ severity: 'success', summary: 'Address Deleted', detail: res.message });
            this.deliveryAddress();
          }
        },
        error: (err: any) => {
          console.log(err);
          if (err.status === 404) {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
          } else {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.msg });
          }
        }
      });
    }
  }

  editAdd(add: any) {
    // console.log(add);
    this.addressCard = true;
    this.itemId = add._id;
    this.addressCreateForm.get('house_No')?.setValue(add.house_No);
    this.addressCreateForm.get('street')?.setValue(add.street);
    this.addressCreateForm.get('city')?.setValue(add.city);
    this.addressCreateForm.get('district')?.setValue(add.district);
    this.addressCreateForm.get('state')?.setValue(add.state);
    this.addressCreateForm.get('pincode')?.setValue(add.pincode);
    this.addressCreateForm.get('locality')?.setValue(add.locality);
    this.addressCreateForm.get('name')?.setValue(add.name);
    this.addressCreateForm.get('mobile_no')?.setValue(add.mobile_no);
    this.addressCreateForm.get('_id')?.setValue(add._id);
  }

  editDeliveryAddress() {
    this.dataVerify = true;
    this.addressCreateForm.get('userId')?.setValue(this.userData.id);
    // console.log(this.addressCreateForm.value);
    // return;
    if (this.addressCreateForm.valid) {
      this.foodServ.editDeliveryAddress(this.addressCreateForm.value).subscribe({
        next: (res: any) => {
          console.log(res, "edit delivery add");
          if (res.status === 200) {
            this.msgServ.add({ severity: 'success', summary: 'Address added', detail: res.message });
            this.addressCard = false;
            this.deliveryAddress();
          }
        }, error: (err: any) => {
          console.log(err);
          if (err.status === 404) {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
          } else {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.message });
          }
        }
      })
    } else {
      this.msgServ.add({ severity: 'error', summary: 'Invalid Form', detail: 'Please Fill data correctly' });
    }
  }

  selectedAddress(data: any) {
    this.selectedAddState = true;
    this.itemId = data._id;
    this.selectedAdd = data;
    // console.log(data, "selected address");
  }

  addOrderData() {
    let items: { itemId: any, itemQuantity: number; itemPrice: string }[] = [];

    for (let i = 0; i < this.itemsArray.length; i++) {
      const element = this.itemsArray[i];
      items.push({
        itemId: element.itemId,
        itemQuantity: element.quantity,
        itemPrice: element.itemPrice,
      });
    }

    console.log(items, "items listbbbbbbb");
    

    let data = {
      items: items,
      userId: this.userData.id,
      addressId: this.selectedAdd?._id,
      order_amount: this.totalPrice,
    }
    // return;
    if (data !== null) {
      this.orderServ.addOrderData(data).subscribe({
        next: (res: any) => {
          // console.log(res, "order insert");
          if (res.status === 200) {
            this.msgServ.add({ severity: 'success', summary: 'Order Successful', detail: res.message });
            this.dataServ.resetCartCount();
            setTimeout(() => {
              this.router.navigate(['/food/list']);
            }, 2000);
          }
        }, error: (err: any) => {
          console.log(err);
          if (err.status === 404) {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: 'Backend Api error' });
          } else {
            this.msgServ.add({ severity: 'error', summary: 'Something went wrong', detail: err.error.message });
          }
        }
      })
    }

    this.foodServ.deleteAllCart(this.userData.id).subscribe({
      next: (res: any) => {
        console.log(res, "cart count delete");
      }, error: (err: any) => {
        console.log(err);
      }
    })
  }

}
