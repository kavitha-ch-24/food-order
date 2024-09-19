import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: '', component: LoginComponent },
];
