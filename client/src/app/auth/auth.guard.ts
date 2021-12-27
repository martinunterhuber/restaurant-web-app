import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let roles = route.data["roles"] as Array<string> || [];
    if (roles.some((role) => this.authService.hasRole(role))) {
      return true;
    } else if (this.authService.isLoggedIn() && roles.length === 0) {
      return true;
    }
    return this.router.createUrlTree(["login"]);
  }
}
