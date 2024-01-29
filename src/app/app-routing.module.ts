import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginpageComponent } from "./loginpage/loginpage.component";
import { RegisterpageComponent } from "./registerpage/registerpage.component";
import { CartpageComponent } from "./cartpage/cartpage.component";
import { AdminPanelComponent } from "./admin-panel/product-panel/product-panel/admin-panel.component";
import { PromoCodePanelComponent } from "./admin-panel/promo-code-panel/promo-code-panel.component";
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { AuthGuard } from "./auth.guard";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";
import {ProductdetailpageComponent} from "./productdetailpage/productdetailpage.component";

const routes: Routes = [
  { path: '', component: DashboardComponent},
  { path: 'login', component: LoginpageComponent },
  { path: 'register', component: RegisterpageComponent },
  { path: 'cart-page', component: CartpageComponent },
  { path: 'product-panel', component: AdminPanelComponent, canActivate: [AuthGuard]},
  { path: 'promo-panel', component: PromoCodePanelComponent, canActivate: [AuthGuard]},
  { path: 'admin-page', component: AdminPageComponent, canActivate: [AuthGuard]},
  { path: 'product/:id', component: ProductdetailpageComponent },
  { path: '**', pathMatch: 'full', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
