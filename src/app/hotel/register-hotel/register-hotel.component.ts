import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HotelService } from '../../_services/hotel.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register-hotel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ToastModule, RouterModule],
  templateUrl: './register-hotel.component.html',
  styleUrl: './register-hotel.component.css',
  providers: [MessageService]
})
export class RegisterHotelComponent {
  hotelRegisterForm: FormGroup;
  confirmPassword: any;
  dataVerify: boolean = false;
  spinner: boolean = false;
  imgFile: any;

  constructor(private msgServ: MessageService, private hotelServ: HotelService, private router: Router) {
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

  fileUpload(e: any): void {
    this.imgFile = e.target.files[0];
    console.log(this.imgFile);

    if (this.imgFile) {
      this.hotelRegisterForm.controls['hotel_img'].setValue(this.imgFile);
    } else {
      this.hotelRegisterForm.controls['hotel_img'].setValue('');
    }
  }

  registerHotel() {
    this.dataVerify = true;
    if (this.hotelRegisterForm.valid) {
      console.log(this.hotelRegisterForm.value);
      this.hotelServ.registerHotel(this.hotelRegisterForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          this.spinner = true;
          if (res.status === 200) {
            this.msgServ.add({ severity: 'success', summary: 'Hotel Created', detail: res.message });
            this.spinner = false;
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 5000);
          } else {
            this.msgServ.add({ severity: 'error', summary: 'Error', detail: res.msg });
          }
        }, error: (err: any) => {
          this.msgServ.add({ severity: 'error', summary: 'Error', detail: err.error.msg });
        }
      })
    }
  }
}
