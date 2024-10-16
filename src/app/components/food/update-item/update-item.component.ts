import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../_services/food.service';

@Component({
  selector: 'app-update-item',
  standalone: true,
  imports: [ToastModule, ReactiveFormsModule, CommonModule],
  templateUrl: './update-item.component.html',
  styleUrl: './update-item.component.css',
  providers: [MessageService]
})
export class UpdateItemComponent {
  dataVerify: boolean = false;
  updateItemForm: FormGroup;
  itemId: any;
  items: any[] = [];
  itemData: any;
  isModalOpen: boolean = false;
  imgFile: any;
  spinner:boolean = true;

  ngOnInit(): void {
    this.primeNGConfig.ripple = true;
    this.ar.url.subscribe((params) => {
      console.log(params[2]);
      this.itemId = params[2].path;
    })
    this.getItemsList();
  }

  constructor(private ar: ActivatedRoute, private foodServ: FoodService, private router: Router, private messageService: MessageService, private primeNGConfig: PrimeNGConfig) {
    this.updateItemForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      food_type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required)
    })
  }

  get myfc() {
    return this.updateItemForm.controls;
  }

  getItemsList() {
    this.foodServ.getFoodItemsList().subscribe({
      next: (res: any) => {
        console.log(res);
        this.items = res.data;
        this.spinner = false;
        this.getItemById();
      }, error: (err: any) => {
        console.log(err.error.message);
      }
    })
  }

  getItemById() {
    const item = this.items.find(item => item._id === this.itemId);
    console.log(item, "checking item");
    this.itemData = item;
    this.updateFillData(item);
  }

  updateFillData(data: any) {
    this.myfc['itemName'].setValue(data.itemName),
      this.myfc['description'].setValue(data.description),
      this.myfc['price'].setValue(data.price),
      this.myfc['food_type'].setValue(data.food_type),
      this.myfc['category'].setValue(data.category),
      this.myfc['id'].setValue(this.itemId);
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  fileUpload(e: any) {
    this.imgFile = e.target.files[0];
  }

  saveChanges() {
    this.toggleModal();
    this.updateItemImage();
  }

  updateItem() {
    console.log(this.updateItemForm.value);
    console.log(this.updateItemForm.controls);
    this.foodServ.updateItem(this.updateItemForm.value).subscribe({
      next: (res: any) => {
        this.spinner = false;
        console.log(res);
        if (res.status === 200) {
          this.messageService.add({ severity: 'success', summary: 'Item Updated Successfully', detail: res.msg });
          setTimeout(() => {
            this.router.navigate(['/food/list']);
          }, 2000);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.msg });
        }
      }, error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.msg });
      }
    })
  }

  updateItemImage() {
    let data = {
      id: this.itemId,
      image_url: this.imgFile
    }
    this.foodServ.updateItemImage(data).subscribe({
      next: (res: any) => {
        this.spinner = false;
        console.log(res);
        if (res.status === 200) {
          this.messageService.add({ severity: 'success', summary: 'Image Updated Successfully', detail: res.msg });
          setTimeout(() => {
            this.router.navigate(['/food/list']);
          }, 2000);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.msg });
        }
      }, error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.msg });
      }
    })
  }
}
