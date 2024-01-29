import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpService} from "../../../services/http.service";
import {AlertService} from "../../../services/alert.service";
import {ToastrService} from "ngx-toastr";
import {PromoCode} from "../../../models/PromoCode.model";

interface DialogData {
  promocode: PromoCode;
}

@Component({
  selector: 'app-update-code',
  templateUrl: '../create-code/create-code.component.html',
  styleUrls: ['../create-code/create-code.component.scss']
})
export class UpdateCodeComponent {

  promocode: PromoCode;
  promoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UpdateCodeComponent>,
    private httpService: HttpService,
    private alertService: AlertService,
    private toastr: ToastrService
  ){
    const displayDate: string = new Date(data.promocode.expirationDate).toISOString().split('T')[0];
    this.promoForm = this.formBuilder.group({
      id: data.promocode.id,
      code: data.promocode.code,
      discount: data.promocode.discount,
      active: data.promocode.active.toString(),
      expirationDate: displayDate
    });
    this.promocode = data.promocode;
  }

  submitForm(): void {
    if (!this.areAllFieldsFilled()) {
      this.updateCode();
    } else {
      this.toastr.error('Vul alle velden in');
    }
  }

  areAllFieldsFilled(): boolean {
    return this.promoForm.value.code === '' || this.promoForm.value.discount === '' || this.promoForm.value.expirationDate === '' || this.promoForm.value.active === '';
  }


  updateCode(): void {
    this.httpService.put('promo-code', this.promoForm.value).subscribe({
      next: () => {
        this.toastr.success('Promo-code is aangepast');
        this.closeDialog();
      },
      error: () => {
          this.toastr.error('Product kon niet aangepast worden');
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
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
