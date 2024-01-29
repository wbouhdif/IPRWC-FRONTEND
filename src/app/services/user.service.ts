import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../models/Account.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private activeAccount : Account | undefined;
  private jwtToken : any;
  private isLoggedInSubject : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isLoggedIn());

  constructor(private router: Router, private toastr: ToastrService) { }

  isLoggedIn$ : Observable<boolean> = this.isLoggedInSubject.asObservable();

  setActiveAccount(activeAccount: Account): void {
    this.activeAccount = activeAccount;
    sessionStorage.setItem('active-account', JSON.stringify(activeAccount));
    this.isLoggedInSubject.next(true);
  }

  setJwtToken(jwtToken: string): void {
    this.jwtToken = jwtToken;
    sessionStorage.setItem('jwt-token', jwtToken);
    this.isLoggedInSubject.next(true);
  }

  logOut(): void {
    sessionStorage.removeItem('active-account');
    sessionStorage.removeItem('jwt-token');
    this.jwtToken = undefined;
    this.activeAccount = undefined;
    this.toastr.success('Succesvol uitgelogd', 'Succes');
    this.isLoggedInSubject.next(false);
  }

  getActiveAccount(): Account | undefined {
    let activeAccount: any = sessionStorage.getItem('active-account');
    if (activeAccount == undefined) {
      this.router.navigate(['login']);
      return;
    }
    activeAccount = JSON.parse(activeAccount);
    this.activeAccount = activeAccount;
    return this.activeAccount;
  }

  getJwtToken(): any {
    this.jwtToken = sessionStorage.getItem('jwt-token');
    return this.jwtToken;
  }

  isLoggedIn(): boolean {
    return this.getJwtToken() != undefined;
  }
}
