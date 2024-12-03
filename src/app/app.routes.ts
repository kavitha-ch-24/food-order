import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterUserComponent } from './components/user/register-user/register-user.component';
import { UserListComponent } from './components/user/user-list/user-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItemsListComponent } from './components/food/items-list/items-list.component';
import { CreateItemComponent } from './components/food/create-item/create-item.component';
import { UserDescComponent } from './components/user/user-desc/user-desc.component';
import { AuthGuardService } from './_services/auth-guard.service';
import { UpdateItemComponent } from './components/food/update-item/update-item.component';
import { CartComponent } from './components/food/cart/cart.component';
import { PaymentComponent } from './components/food/payment/payment.component';
import { OrderListComponent } from './components/order/order-list/order-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'user/register', component: RegisterUserComponent }, 
  {
    path: '',
    canActivate: [AuthGuardService],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'user/list', component: UserListComponent },
      { path: 'user/desc', component: UserDescComponent },
      { path: 'food/list', component: ItemsListComponent },
      { path: 'food/create', component: CreateItemComponent },
      { path: 'food/edit/:id', component: UpdateItemComponent },
      { path: 'food/cart', component: CartComponent },
      { path: 'food/payment', component: PaymentComponent },
      { path: 'order/list', component: OrderListComponent },
    ]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

