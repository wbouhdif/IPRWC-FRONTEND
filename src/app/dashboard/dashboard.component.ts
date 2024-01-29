import { Component } from '@angular/core';
import {Product} from "../models/Product.model";
import {HttpService} from "../services/http.service";
import {CartService} from "../services/cart.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  products: Product[] = [];

  constructor(private cartService: CartService, private httpService: HttpService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.httpService.get('product').subscribe((response) => {
      response.body.forEach((product: Product) => {
        this.products.push(product);
      })
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastr.success('Added to cart', 'Success', { timeOut: 700 });
  }
}


