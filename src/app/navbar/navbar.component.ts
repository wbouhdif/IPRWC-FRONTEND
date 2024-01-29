import { Component, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnDestroy {
  isLoggedIn: boolean = false;
  private subscription: Subscription;


  constructor(
    private userService: UserService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.subscription = this.userService.isLoggedIn$.subscribe(loggedIn => {
      this.isLoggedIn = loggedIn;
      this.changeDetectorRef.markForCheck();
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout(): void {
    this.userService.logOut();
  }
}
