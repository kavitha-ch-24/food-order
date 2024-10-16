import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../_services/user.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, ToastModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css',
  providers: [MessageService]
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  dataVerify: boolean = false;
  confirmPassword: any;
  spinner:boolean = true;

  constructor(private messageService: MessageService, private userServ: UserService, private primengConfig: PrimeNGConfig, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      phone_number: new FormControl('', Validators.required),
    })
  }

  get myfc() {
    return this.registerForm.controls;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  createAccount() {
    this.dataVerify = true;
    console.log(this.registerForm.controls);
    console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      if (this.registerForm.get('password')?.value === this.confirmPassword) {
        this.userServ.createUser(this.registerForm.value).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.status === 200) {
              this.messageService.add({ severity: 'success', summary: 'Account Created', detail: res.msg });
              this.router.navigate(['/login'])
            } else {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: res.error });
            }
          }, error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Password Error', detail: 'Passwords do not match' });
      }
    }
  }
}
