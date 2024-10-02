import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemsListComponent } from './components/food/items-list/items-list.component';
import { CreateItemComponent } from './components/food/create-item/create-item.component';
import { UserDescComponent } from './components/user/user-desc/user-desc.component';
import { AuthGuardService } from './_services/auth-guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'user/register', component: RegisterUserComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuardService] },
    { path: 'user/list', component: UserListComponent, canActivate:[AuthGuardService] },
    { path: 'user/desc', component: UserDescComponent, canActivate:[AuthGuardService] },
    { path: 'food/list', component: ItemsListComponent, canActivate:[AuthGuardService] },
    { path: 'food/create', component: CreateItemComponent, canActivate:[AuthGuardService] },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
