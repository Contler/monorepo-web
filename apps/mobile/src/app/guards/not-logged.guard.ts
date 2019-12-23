import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: "root"
})
export class NotLoggedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.authService.user) {
      this.router.navigate(["inmediate-requests/pending"]);
      return false;
    } else {
      return true;
    }
  }
}
