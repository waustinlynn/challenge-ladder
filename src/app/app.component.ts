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
        this.user = this.userService.user;
        this.isAdmin = this.userService.isAdmin;
        this.checkReadonly();
      }
    });

    this.userService.hasPlayerObs.subscribe(hasPlayer => {
      this.authenticated = hasPlayer;
      this.checkReadonly();
    });
  }

  private checkReadonly() {
    if (this.user != undefined && !this.authenticated && !this.isAdmin) {
      this.isReadonly = true;
    } else {
      this.isReadonly = false;
    }
  }

  private status() {
    console.log('admin', this.isAdmin);
    console.log('authenticated', this.authenticated);
    console.log('readonly', this.isReadonly);
  }
}
