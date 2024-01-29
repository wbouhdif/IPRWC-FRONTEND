import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";
import { HttpService } from '../services/http.service';
import { Account } from "../models/Account.model";

@Component({
  selector: 'app-registerpage',
  templateUrl: './registerpage.component.html',
  styleUrls: ['./registerpage.component.scss']
})
export class RegisterpageComponent {
  registerForm: FormGroup;
  passwordIsValid = false;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private alertService: AlertService,
    private router: Router,
    private httpService: HttpService
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email]],
      confirmEmail: [''],
      password: [''],
      confirmPassword: ['']
    });
  }

  onSubmit(): void {
    if (this.isEmailValid() && this.allFieldsFilled() && this.emailsMatch() && this.passwordsMatch()) {
      this.register();
    }
  }

  register(): void {
    let account: Account = new Account(undefined, this.registerForm.get('email')?.value, this.registerForm.get('password')?.value, undefined);
    this.httpService.post("account", account).subscribe({
        next: () => {
          this.alertService.fireSuccess("Uw account is aangemaakt, u kunt nu inloggen")
            .then(() => {
              this.router.navigate(['/login']);
            });
        },
        error: () => {
          this.toastr.error('Er is iets fout gegaan, probeer het later opnieuw.', 'Error');
        }
      }
    );
  }

  isEmailValid(): boolean {
    const emailControl = this.registerForm.get('email');
    if (!emailControl || emailControl.invalid) {
      this.toastr.error('Voer een geldig e-mailadres in.', 'Ongeldig e-mailadres');
      return false;
    }
    return true;
  }

  allFieldsFilled(): boolean {
    for (let key in this.registerForm.value) {
      if (this.registerForm.get(key)?.value === '') {
        this.toastr.error('Niet alle velden zijn ingevuld.', 'Error');
        return false;
      }
    }
    return true;
  }

  emailsMatch(): boolean {
    if (this.registerForm.get('email')?.value !== this.registerForm.get('confirmEmail')?.value) {
      this.toastr.error('De e-mailadressen komen niet overeen.', 'Error');
      return false;
    }
    return true;
  }

  passwordsMatch(): boolean {
    if (this.registerForm.get('password')?.value !== this.registerForm.get('confirmPassword')?.value) {
      this.toastr.error('De wachtwoorden komen niet overeen.', 'Error');
      return false;
    }
    return true;
  }

  passwordValid(event: boolean): void {
    this.passwordIsValid = event;
  }
}
