import { Component, OnInit } from '@angular/core';

import { AuthService as OAuthService } from './auth.service';
import { UserService } from './user.service';
import { AdminService } from './admin.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenge-ladder';
  user: any;
  authenticated: boolean = false;
  constructor(
    private socialAuthService: AuthService,
    private oauth: OAuthService,
    public userService: UserService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.userService.authenticated.subscribe(isValid => {
      if (isValid) {
        this.user = this.userService.user;
      }
    });
  }

  isAdmin(user) {
    if (user != undefined) {
      if (user.email != undefined) {
        return this.adminService.isAdmin(user.email);
      }
    }
    return false;
  }
}
