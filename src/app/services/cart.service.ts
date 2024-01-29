import { Injectable } from '@angular/core';
import {CartModel} from "../models/Cart.model";
import {Product} from "../models/Product.model";
import {CartItemModel} from "../models/CartItem.model";
import {PromoCode} from "../models/PromoCode.model";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:CartModel = new CartModel();

  constructor() {
    this.loadCart();
  }

  addToCart(product: Product): void {
    let cartItem = this.cart.items.find(item => item.product.id === product.id);
    if (cartItem) {
      this.changeQuantity(product.id, cartItem.quantity + 1);
      return;
    }
    this.cart.items.push(new CartItemModel(product));
    this.saveCart();
  }

  saveCart(): void {
    localStorage.setItem('shoppingCart', JSON.stringify(this.cart));
  }

  loadCart(): void {
    const savedCart : string | null = localStorage.getItem('shoppingCart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      this.cart = new CartModel();
      this.cart.items = parsedCart.items;
      this.cart.discount = parsedCart.discount;
      this.cart.hasPromoCode = parsedCart.hasPromoCode;
      this.cart.promoCode = parsedCart.promoCode;
    } else {
      this.cart = new CartModel();
    }
  }

  removeFromCart(productID: string): void {
    this.cart.items =
      this.cart.items.filter(item => item.product.id !== productID);
    this.saveCart();
  }

    changeQuantity(productID: string, quantity: number): void {
    let cartItem : CartItemModel | undefined = this.cart.items.find(item => item.product.id === productID);
    if (!cartItem) return;
    cartItem.quantity = quantity;
    this.saveCart();
    }

    getCart(): CartModel {
    return this.cart;
    }

    checkout(): void{
      this.cart = new CartModel();
    }


  applyPromoCode(promoCode: PromoCode): void {
    this.cart.discount = promoCode.discount / 100;
    this.cart.hasPromoCode = true;
    this.cart.promoCode = promoCode.code;
    this.saveCart();
  }

  removePromoCode(): void {
    this.cart.discount = 0;
    this.cart.hasPromoCode = false;
    this.cart.promoCode = null;
    this.saveCart();
  }
}
