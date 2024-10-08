import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor() {
    this.updateItemForm = new FormGroup({
      itemName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      food_type: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      image_url: new FormControl(''),
    })
  }

  updateItem() {

  }

  fileUpload(e: any) {

  }
}
