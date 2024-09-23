import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemsListComponent } from './components/food/items-list/items-list.component';
import { CreateItemComponent } from './components/food/create-item/create-item.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegisterUserComponent },
    { path: 'user-list', component: UserListComponent },
    { path: 'food/list', component: ItemsListComponent },
    { path: 'food/create', component: CreateItemComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
