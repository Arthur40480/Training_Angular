import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { CartComponent } from './components/cart/cart.component';
import { CustomerComponent } from './components/customer/customer.component';
import { OrderComponent } from './components/order/order.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuard } from './components/admin.guard';
import { LoginComponent } from './components/login/login.component';
import { AdminDataFormComponent } from './components/admin-data-form/admin-data-form.component';

const routes: Routes = [
  { path : 'trainings', component : TrainingsComponent},
  { path : 'cart', component : CartComponent},
  { path : 'customer', component : CustomerComponent},
  { path : 'order', component : OrderComponent},
  { path : 'login', component : LoginComponent},
  {
    path: 'admin', component : AdminComponent,
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin-data-form', component : AdminDataFormComponent,
    canActivate: [AdminGuard]
  },
  { 
    path: 'admin-data-form/:id', component : AdminDataFormComponent,
    canActivate: [AdminGuard]
  },
  { path : '', redirectTo : 'trainings', pathMatch : 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
