import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertService } from '../../../services/alert.service';
import { HttpService } from '../../../services/http.service';
import { Product } from '../../../models/Product.model';
import { CreateProductComponent } from './create-product/create-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: any = null;

  constructor(
    private httpService: HttpService,
    private alertService: AlertService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products = [];
    this.httpService.get('product').subscribe((response) => {
      response.body.forEach((product: Product) => {
        this.products.push(product);
      })
    })
  }

  openCreateProductModal(): void {
    const dialogRef = this.dialog.open(CreateProductComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
    this.selectedProduct = null;
  }

  openEditProductModal(product: Product): void {
    const dialogRef = this.dialog.open(UpdateProductComponent, { width: '500px', data: { product } });
    dialogRef.afterClosed().subscribe(() => {
      this.getProducts();
    });
    this.selectedProduct = null;
  }

  deleteProduct(product: Product): void {
    this.httpService.delete(`product/${product.id}`).subscribe({
      next: () => {
        this.getProducts();
        this.alertService.fireSuccess(`Product "${product.name}" is verwijderd`);
      },
      error: () => {
        this.alertService.fireError(`Er is een fout opgetreden bij het verwijderen van het product "${product.name}"`);
      }
    });
    this.selectedProduct = null;
  }

  showDeleteProductWarning(product: Product): void {
    this.alertService.fireWarning(`Je staat op het punt om het product "${product.name}" te verwijderen. Dit kan niet ongedaan worden gemaakt.`)
      .then((result) => {
        if (result.isConfirmed) {
          this.deleteProduct(product);
        }
      });
  }

  setSelectedProduct(product: Product): void {
    this.selectedProduct = this.selectedProduct === product ? null : product;
  }
}
