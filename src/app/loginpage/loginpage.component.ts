import { Component } from '@angular/core';
import { HttpService } from "../services/http.service";
import { LoginCredentials } from "../models/Login-Credentials.model";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { AlertService } from "../services/alert.service";
import { Router } from "@angular/router";
import { UserService } from "../services/user.service";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {

  loginForm: FormGroup = new FormGroup({});


  constructor(private httpService: HttpService, private fb: FormBuilder, private toastr: ToastrService, private alertService: AlertService, private router: Router, private userService: UserService) {
    this.loginForm = this.fb.group({
        email: [''],
        password: [''],
      })
    }


  onSubmit(): void {
    if(this.allFieldsFilled()) {
      this.postCredentials();
    }
  }

  postCredentials(): void {
    let email = this.loginForm.get("email")?.value;
    let password = this.loginForm.get("password")?.value;

    this.httpService.post("auth/login", new LoginCredentials(email, password)).subscribe({
      next: (response): void => {
        this.userService.setJwtToken(response.body.token);
        this.userService.setActiveAccount(response.body.account);


        if(response.body.account.role.name == "admin") {
          this.router.navigate(['admin-page']);
          return;
        }

        this.router.navigate(['']);

        this.toastr.success('Succesvol ingelogd.', 'Succes');
      },
      error: () => {
        this.toastr.error('Het is niet gelukt om in te loggen.', 'Error');
      }
    });
  }

  allFieldsFilled(): boolean {
    for(let key in this.loginForm.value) {
      if (this.loginForm.get(key)?.value == '') {
        this.toastr.error('Niet alle velden zijn ingevuld.', 'Error');
        return false;
      }
    }
    return true;
  }
}
