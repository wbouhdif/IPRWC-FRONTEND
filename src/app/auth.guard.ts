import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {UserService} from "./services/user.service";
import {Account} from "./models/Account.model";


@Injectable()
export class AuthGuard {

  constructor(public userService: UserService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean|UrlTree> | Promise<boolean|UrlTree> {
    const activeAccount : Account | undefined = this.userService.getActiveAccount();
    if (activeAccount && activeAccount.role.name === 'admin') {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }
}
