
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataServiceService } from '../../../_services/data-service.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FoodService } from '../../../_services/food.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [ToastModule, CommonModule, ReactiveFormsModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
  providers:[MessageService]
})

export class CreateItemComponent {
  itemClick: boolean = false;
  itemCreateForm: FormGroup;
  dataVerify: boolean = false;
  hotelData: any;
  imgFile: any;
  spinner:boolean = false;

  constructor(private ar: ActivatedRoute, private dataServ: DataServiceService, private foodServ: FoodService,private primengConfig: PrimeNGConfig, private messageService: MessageService,  private router: Router) {
    this.itemCreateForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      image_url: new FormControl(null, Validators.required),
      food_type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      hotel_name: new FormControl('', Validators.required),
      hotel_email: new FormControl('', Validators.required),
      hotel_id: new FormControl('', Validators.required),
    })
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.ar.url.subscribe((params) => { })
    this.hotelData = this.dataServ.getHotelInfo()?.data;
    console.log(this.hotelData, "hotelData");
  }

  fileUpload(e: any): void {
    this.imgFile = e.target.files[0];

    if (this.imgFile) {
      this.itemCreateForm.controls['image_url'].setValue(this.imgFile);
    } else {
      this.itemCreateForm.controls['image_url'].setValue('');
    }
  }

  createItem() {
    this.dataVerify = true;
    this.itemCreateForm.controls['hotel_name'].setValue(this.hotelData.name);
    this.itemCreateForm.controls['hotel_email'].setValue(this.hotelData.email);
    this.itemCreateForm.controls['hotel_id'].setValue(this.hotelData.id);
    if (this.itemCreateForm.valid) {
      console.log(this.itemCreateForm.value);
      this.foodServ.createItem(this.itemCreateForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.spinner = true;
          if (res.status === 200) {
            this.messageService.add({ severity: 'success', summary: 'Item Created', detail: res.msg });
            this.spinner = false;
            // setTimeout(() => {
            //   this.router.navigate(['/food/list']);
            // }, 5000);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: res.msg });
          }
        }, error: (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.msg });
        }
      })
    }
  }

}
