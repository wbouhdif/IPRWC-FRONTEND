import {Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertService } from 'src/app/services/alert.service';
import { HttpService } from 'src/app/services/http.service';
import { ToastrService } from "ngx-toastr";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-create-code',
  templateUrl: './create-code.component.html',
  styleUrls: ['./create-code.component.scss'
  ]
})
export class CreateCodeComponent {
  promoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<CreateCodeComponent>, private httpService: HttpService, private alertService: AlertService, private toastr: ToastrService) {
    this.promoForm = this.formBuilder.group({
      active: '',
      code: '',
      discount: '',
      expirationDate: ''
    });
  }

  submitForm(): void {
    if (this.AllfieldsFilled()) {
      this.toastr.error('Vul alle velden in');
      return;
    }
    this.addPromoCode();
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addPromoCode(): void {
    this.httpService.post('promo-code', this.promoForm.value).subscribe({
      next: (): void => {
        Swal.close();
        this.toastr.success('Promocode is aangemaakt');

      },
      error: () : void => {
        Swal.close();
        this.toastr.error('Promocode kon niet aangemaakt worden');
      }
    });
  }


  AllfieldsFilled(): boolean {
    return this.promoForm.value.active == '' || this.promoForm.value.code == '' || this.promoForm.value.discount == '' || this.promoForm.value.expirationDate == '';
  }

  onDiscountKeyDown(event: KeyboardEvent): void {
    const currentValue = (event.target as HTMLInputElement).value;
    const newValue = currentValue + event.key;
    const discountValue = Number(newValue);

    if (discountValue < 0 || discountValue > 100) {
      event.preventDefault();
    }
  }
}
