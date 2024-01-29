import { Component, OnInit } from '@angular/core';
import { Product } from "../models/Product.model";
import { ActivatedRoute } from "@angular/router";
import { HttpService } from "../services/http.service";
import { CartService } from "../services/cart.service";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-productdetailpage',
  templateUrl: './productdetailpage.component.html',
  styleUrls: ['./productdetailpage.component.scss']
})
export class ProductdetailpageComponent implements OnInit {
  product: Product | undefined;

  constructor(private route: ActivatedRoute, private httpService: HttpService, private cartService: CartService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductById(productId);
    }
  }

  getProductById(id: string): void {
    this.httpService.get('product/' + id).subscribe(
      (response) => {
        this.product = response.body;
      },
      () => {
        this.toastr.error('Niet gelukt om product op te halen', 'Error', { timeOut: 700 });
      }
    );
  }


  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.toastr.success('Added to cart', 'Success', { timeOut: 700 });
  }
}
