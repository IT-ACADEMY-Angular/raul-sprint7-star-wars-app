import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve) => {
      this.authService.authStateReady().then((isLoggedIn) => {
        if (isLoggedIn) {
          resolve(true);
        } else {
          const returnUrl = state.url;
          localStorage.setItem('returnUrl', returnUrl);

          this.router.navigate([{ outlets: { modal: ['login'] } }], {
            queryParams: { returnUrl },
          });
          resolve(false);
        }
      });
    });
  }
}
