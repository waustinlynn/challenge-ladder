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
  isAdmin: boolean = false;
  isReadonly: boolean = false;
  constructor(
    private socialAuthService: AuthService,
    private oauth: OAuthService,
    public userService: UserService) { }

  ngOnInit() {
    this.userService.authenticated.subscribe(isValid => {
      if (isValid) {
        this.authenticated = this.userService.hasPlayer;
        this.user = this.userService.user;
        this.isAdmin = this.userService.isAdmin;
        this.isReadonly = !this.isAdmin && !this.authenticated;
      }
    });
  }
}
