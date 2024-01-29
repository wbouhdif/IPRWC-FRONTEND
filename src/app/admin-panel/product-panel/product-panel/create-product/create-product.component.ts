import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from "ngx-toastr";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'
  ]
})
export class CreateProductComponent {
  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateProductComponent>, private httpService: HttpService, private alertService: AlertService, private toastr: ToastrService) {
    this.productForm = this.formBuilder.group({
      name: '',
      price: '',
      description: ''
    });
  }

  submitProductForm() : void {
    if (this.allFieldsFilled()) {
      this.toastr.error('Vul alle velden in');
      return;
    }
    this.roundPrice();
    this.addProduct();
    this.closeDialog();
  }

   closeDialog() : void {
    this.dialogRef.close();
  }

  roundPrice() : void {
    this.productForm.value.price = (Math.round(this.productForm.value.price * 100) / 100);
  }

  addProduct() : void {
    this.httpService.post('product', this.productForm.value).subscribe({
      next: () => {
        Swal.close();
        this.toastr.success('Product is aangemaakt');
      },
      error: () => {
        Swal.close();
        this.toastr.error('Product kon niet aangemaakt worden');
      }
    });
  }

  allFieldsFilled() : boolean {
    return this.productForm.value.name == '' || this.productForm.value.price == '' || this.productForm.value.description == '';
  }
}
