import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastModule],
  templateUrl: './register-hotel.component.html',
  styleUrl: './register-hotel.component.css',
  providers:[MessageService]
})
export class RegisterHotelComponent {
  hotelRegisterForm: FormGroup;
  confirmPassword: any;
  dataVerify: boolean = false;
  spinner: boolean = false;

  constructor(private msgServ:MessageService) {
    this.hotelRegisterForm = new FormGroup({
      hotel_name: new FormControl('', Validators.required),
      hotel_email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      hotel_street: new FormControl('', Validators.required),
      hotel_category: new FormControl('', Validators.required),
      hotel_area: new FormControl('', Validators.required),
      hotel_locality: new FormControl('', Validators.required),
      hotel_city: new FormControl('', Validators.required),
      hotel_pincode: new FormControl('', Validators.required),
      hotel_img: new FormControl('', Validators.required)
    })
  }

  get myfc() {
    return this.hotelRegisterForm.controls;
  }

  createHotel() {

  }
}
