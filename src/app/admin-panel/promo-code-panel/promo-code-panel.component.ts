import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {PromoCode} from "../../models/PromoCode.model";
import {HttpService} from "../../services/http.service";
import {AlertService} from "../../services/alert.service";
import {CreateCodeComponent} from "./create-code/create-code.component";
import {UpdateCodeComponent} from "./update-code/update-code.component";



@Component({
  selector: 'app-promo-code-panel',
  templateUrl: 'promo-code-panel.component.html',
  styleUrls: ['./promo-code-panel.component.scss']
})
export class PromoCodePanelComponent implements OnInit {

  promocodes: PromoCode[] = [];
  selectedCode: any = null;

  constructor(
    private httpService: HttpService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCodes();
  }

  getCodes(): void {
    this.promocodes = [];
    this.httpService.get('promo-code').subscribe((response) => {
      response.body.forEach((promoCode: PromoCode) => {
        this.promocodes.push(promoCode);
      })
    })
  }

  openCreateCodeModal(): void {
    const dialogRef = this.dialog.open(CreateCodeComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(() => {
      this.getCodes();
    });
    this.selectedCode = null;
  }

  openEditCodeModal(promoCode: PromoCode): void {
    const dialogRef = this.dialog.open(UpdateCodeComponent, { width: '500px', data: { promocode: promoCode } });
    dialogRef.afterClosed().subscribe(() => {
      this.getCodes();
    });
    this.selectedCode = null;
  }

  deleteProduct(promoCode: PromoCode): void {
    this.httpService.delete(`promo-code/${promoCode.id}`).subscribe({
      next: () => {
        this.getCodes();
        this.alertService.fireSuccess(`Promo-code is verwijderd`);
      },
      error: () => {
        this.alertService.fireError(`Er is een fout opgetreden bij het verwijderen van de promo-code`);
      }
    });
    this.selectedCode = null;
  }

  showDeleteProductWarning(promoCode: PromoCode): void {
    this.alertService.fireWarning(`Je staat op het punt om een promo-code te verwijderen. Dit kan niet ongedaan worden gemaakt.`)
      .then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(promoCode);
        }
      });
  }

  setSelectedCode(promoCode: PromoCode): void {
    this.selectedCode = this.selectedCode === promoCode ? null : promoCode;
  }
}
