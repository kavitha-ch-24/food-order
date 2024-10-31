import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataServiceService } from '../../../_services/data-service.service';
import { FoodService } from '../../../_services/food.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';

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

  constructor(private dataServ: DataServiceService, private foodServ: FoodService, private msgServ: MessageService) {
    this.addressCreateForm = new FormGroup({
      userId: new FormControl('', Validators.required),
      house_No: new FormControl('', Validators.required),
      street: new FormControl('', Validators.required),
      locality: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      district: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      pincode: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      mobile_no: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.userData = this.dataServ.getUserInfo().data;
    console.log(this.userData);
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
    console.log(data);
  }

  deliveryAddress() {
    this.foodServ.getDeliveryAddress(this.userData.id).subscribe({
      next: (res: any) => {
        console.log(res.data);
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

  addressDisplay() {
    this.addressCard = true;
  }

  addressHide() {
    this.addressCard = false;
  }

  addAddress() {
    this.addressCreateForm.get('userId')?.setValue(this.userData.id);
    console.log(this.addressCreateForm.value);
    if (this.addressCreateForm.valid) {
      this.foodServ.addDeliveryAddress(this.addressCreateForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === 200) {
            this.msgServ.add({ severity: 'success', summary: 'Address added', detail: res.message });
            this.activeIndex = this.activeIndex === 1 ? null : 1;
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
    console.log(data);
    let id = data._id;
    this.foodServ.deleteDeliveryAddress(id).subscribe({
      next: (res: any) => {
        console.log(res, "delete delivery address");
        if (res.status === 200) {
          this.msgServ.add({ severity: 'success', summary: 'Address Deleted', detail: res.message });
          this.deliveryAddress();
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
