import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { FooterComponent } from './footer/footer.component';
import { RegisterpageComponent } from './registerpage/registerpage.component';
import { PasswordRequirementsComponent } from './registerpage/password-requirements/password-requirements.component';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AdminPanelComponent } from './admin-panel/product-panel/product-panel/admin-panel.component';
import { CreateProductComponent } from './admin-panel/product-panel/product-panel/create-product/create-product.component';
import { HttpClientModule } from "@angular/common/http";
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateProductComponent } from './admin-panel/product-panel/product-panel/update-product/update-product.component';
import { CartpageComponent } from './cartpage/cartpage.component';
import { CreateCodeComponent } from './admin-panel/promo-code-panel/create-code/create-code.component';
import { UpdateCodeComponent } from './admin-panel/promo-code-panel/update-code/update-code.component';
import { PromoCodePanelComponent } from './admin-panel/promo-code-panel/promo-code-panel.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { AuthGuard } from './auth.guard';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { ProductdetailpageComponent } from './productdetailpage/productdetailpage.component';
import { NgOptimizedImage } from "@angular/common";


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    LoginpageComponent,
    FooterComponent,
    RegisterpageComponent,
    PasswordRequirementsComponent,
    AdminPanelComponent,
    CreateProductComponent,
    UpdateProductComponent,
    CartpageComponent,
    CreateCodeComponent,
    UpdateCodeComponent,
    PromoCodePanelComponent,
    AdminPageComponent,
    NotFoundPageComponent,
    ProductdetailpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    NgOptimizedImage
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
