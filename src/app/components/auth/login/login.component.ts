import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../_services/user.service';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AuthService } from '../../../_services/auth.service';
import { DataServiceService } from '../../../_services/data-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService]
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private userServ: UserService, private primengConfig: PrimeNGConfig, private messageService: MessageService, private router: Router, private authServ: AuthService, private dataServ:DataServiceService) {
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
            this.authServ.login();
            this.dataServ.getCartCount(); 
            setTimeout(() => {
              this.router.navigate(['/food/list']);
            }, 2000);
          } else {
            this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: res.msg });
            console.log(res.msg, "error");
          }
        }, error: (err: any) => {
          // console.log(err);
          // console.log(err.error.msg);
          this.messageService.add({ severity: 'error', summary: 'Please try again later', detail: err.error.msg });
        }
      })
    }
  }
}
