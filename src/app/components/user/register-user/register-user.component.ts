import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { UserService } from '../../../_services/user.service';

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

  constructor(private messageService: MessageService, private userServ: UserService) {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]),
      gender: new FormControl('', Validators.required),
      dob: new FormControl('', Validators.required)
    })
  }

  get myfc() {
    return this.registerForm.controls;
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
          }, error: (err: any) => {
            console.log(err);
          }
        })
      } else {
        this.messageService.add({ severity: 'error', summary: 'Password Error', detail: 'Passwords do not match' });
      }
    } else {
      alert('Invalid form');
    }
  }
}
