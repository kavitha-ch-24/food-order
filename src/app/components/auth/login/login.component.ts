import { Component } from '@angular/core';
import { FormsModule, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userServ: UserService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    })
  }

  get myfc() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  userLogin() {
    if (this.loginForm.valid) {
      this.userServ.userLogin(this.loginForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === 200) {
            localStorage.setItem('userData', JSON.stringify(res));
            this.messageService.add({ severity: 'success', summary: 'Login Success', detail: res.msg });
            this.router.navigate(['/user-list'])
          } else{
            this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: res.err });
          }
        }, error: (err: any) => {
          console.log(err);
        }
      })
    }
  }
}
