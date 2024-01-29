import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {


  constructor(private router: Router) { }


  goToProductPanel(): void {
    this.router.navigate(['/product-panel']);
  }

  goToPromoPanel(): void {
    this.router.navigate(['/promo-panel']);
  }

}
