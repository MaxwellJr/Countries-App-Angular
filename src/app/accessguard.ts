import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";


@Injectable()
export class AccessGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const requiresLogin: boolean = route.data.requiresLogin;
    //console.log(this.authService.getLoginStatus());
    if (requiresLogin && this.authService.getLoginStatus()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}