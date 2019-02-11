import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-idp-login',
  templateUrl: './idp-login.component.html',
  styleUrls: ['./idp-login.component.css']
})
export class IdpLoginComponent implements OnInit {
  user: any;
  constructor(private socialAuthService: AuthService,
    public userService: UserService) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.user = userData;
        this.userService.setUser(userData);
      }
    );
  }

}
