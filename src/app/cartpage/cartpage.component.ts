import { Component } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartModel} from "../models/Cart.model";
import { CartItemModel } from "../models/CartItem.model";
import { UserService } from "../services/user.service";
import { AlertService } from "../services/alert.service";
import { PromoCode } from "../models/PromoCode.model";
import { HttpService } from "../services/http.service";

@Component({
  selector: 'app-cartpage',
  templateUrl: './cartpage.component.html',
  styleUrls: ['./cartpage.component.scss']
})
export class CartpageComponent {

  cart!:CartModel;

  constructor(private cartService: CartService, private userService: UserService, private alertService: AlertService, private httpService: HttpService) {
    this.setCart();
  }

  removeFromCart(cartItem: CartItemModel): void {
    this.cartService.removeFromCart(cartItem.product.id);
    this.setCart()
  }

  changeQuantity(cartItem: CartItemModel, quantityAsString: string): void {
    let quantity = parseInt(quantityAsString);
    this.cartService.changeQuantity(cartItem.product.id, quantity);
    this.setCart()
  }

  setCart(): void {
    this.cart = this.cartService.getCart();
  }

  checkout(): void {
    if(!this.userService.isLoggedIn()){
      this.alertService.fireError("Je moet ingelogd zijn om te bestellen!");
      return;
    }

    if(this.cart.items.length == 0){
      this.alertService.fireError("Je winkelmandje is leeg!");
      return;
    }

    this.cartService.checkout();
    this.setCart();
    this.alertService.fireSuccess("Je bestelling is geplaatst!");
  }

  applyPromoCode(userPromoCode: string): void{
    if(this.cart.hasPromoCode) {
      this.alertService.fireError("Een promocode is al toegepast!");
      return;
    }

    this.httpService.get('promo-code').subscribe((response): void => {
      response.body.forEach((promoCode: PromoCode) => {
        if(userPromoCode == promoCode.code) {
          if(promoCode.active && new Date(promoCode.expirationDate) > new Date()) {
            this.cartService.applyPromoCode(promoCode);
            this.setCart();
            this.alertService.fireSuccess("Promocode is toegepast!");
          } else {
            this.alertService.fireError("Promocode is niet meer geldig!");
          }
        } else {
          this.alertService.fireError("Promocode is niet geldig!");
        }
      })
    })
  }

  removePromoCode(): void {
    this.cartService.removePromoCode();
    this.setCart();
    this.alertService.fireSuccess("Promocode is verwijderd!");
  }
}
