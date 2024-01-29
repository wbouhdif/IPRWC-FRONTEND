import {CartItemModel} from "./CartItem.model";

export class CartModel {
  items: CartItemModel[] = [];
  discount: number = 0;
  hasPromoCode: boolean = false;
  promoCode: string | null = null;

  get totalPrice(): number {
    let totalPrice = 0;
    this.items.forEach(item => totalPrice += item.product.price * item.quantity);
    return totalPrice * (1 - this.discount);
  }


  constructor() {
    this.items = [];
    this.discount = 0;
    this.hasPromoCode = false;
    this.promoCode = null;
  }

}


