import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from '../../../../services/http.service';
import { AlertService } from '../../../../services/alert.service';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../models/Product.model';

interface DialogData {
  product: Product;
}

@Component({
  selector: 'app-update-product',
  templateUrl: '../create-product/create-product.component.html',
  styleUrls: ['../create-product/create-product.component.scss'],
})
export class UpdateProductComponent {
  product: Product;
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateProductComponent>,
    private httpService: HttpService,
    private alertService: AlertService,
    private toastr: ToastrService
  ) {
    this.productForm = this.formBuilder.group({
      name: data.product.name,
      description: data.product.description,
      price: data.product.price,
    });
    this.product = data.product;
  }

  submitProductForm(): void {
    if (!this.areAllFieldsFilled()) {
      this.productForm.value.id = this.product.id;
      this.roundPrice();
      this.updateProduct();
    } else {
      this.toastr.error('Vul alle velden in');
    }
  }

  areAllFieldsFilled(): boolean {
    return (
      this.productForm.value.name === '' ||
      this.productForm.value.price === '' ||
      this.productForm.value.description === ''
    );
  }

  roundPrice(): void {
    this.productForm.value.price = Math.round(this.productForm.value.price * 100) / 100;
  }

  updateProduct(): void {
    this.httpService.put('product', this.productForm.value).subscribe({
      next: () => {
        this.toastr.success('Product is aangepast');
        this.closeDialog();
      },
      error: (err) => {
        if (err.status === 404) {
          this.toastr.error('Product niet gevonden');
        } else {
          this.toastr.error('Product kon niet aangepast worden');
        }
      },
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
