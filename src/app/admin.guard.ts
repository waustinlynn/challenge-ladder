import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAuthenticated: boolean = false;
  constructor(private userService: UserService, private router: Router) {
    userService.authenticated.subscribe(r => this.isAuthenticated = r);
  }
  canActivate(): boolean {
    if (!this.isAuthenticated) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
