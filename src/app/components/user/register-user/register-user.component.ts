import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {
  registerForm: FormGroup;
  dataVerify: boolean = false;

  constructor() {
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
  }
}
