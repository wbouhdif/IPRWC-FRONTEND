import {Product} from "./Product.model";

export class CartItemModel{

  product: Product;
  quantity: number = 1;

  constructor(product: Product){
    this.product = product;
  }

  get price() :number{
    return this.product.price * this.quantity;
  }
}
