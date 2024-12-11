import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../_services/auth.service';
import { DataServiceService } from '../../../_services/data-service.service';
import { ToastModule } from 'primeng/toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HotelService } from '../../../_services/hotel.service';

@Component({
  selector: 'app-hotel-login',
  standalone: true,
  imports: [ToastModule, FormsModule, ReactiveFormsModule],
  templateUrl: './hotel-login.component.html',
  styleUrl: './hotel-login.component.css',
  providers: [MessageService]
})
export class HotelLoginComponent {
  hotelLoginForm: FormGroup;

  constructor(private hotelServ: HotelService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router, private authServ: AuthService, private dataServ: DataServiceService) {
    this.hotelLoginForm = new FormGroup({
      hotel_email: new FormControl('', [Validators.required]),
      hotel_password: new FormControl('', [Validators.required]),
    })
  }

  get myfc() {
    return this.hotelLoginForm.controls;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  userLogin() {
    if (this.hotelLoginForm.valid) {
      this.hotelServ.hotelLogin(this.hotelLoginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('hotelData', JSON.stringify(res));
            this.messageService.add({ severity: 'success', summary: 'Login Success', detail: res.msg });
            this.authServ.login();
            setTimeout(() => {
              this.router.navigate(['/hotel/create-item']);
            }, 2000);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: res.msg });
            console.log(res.msg, "error");
          }
        }, error: (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: err.error.msg });
        }
      })
    }
  }
}
