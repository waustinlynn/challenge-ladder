import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { PlayerService } from '../player.service';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-idp-login',
  templateUrl: './idp-login.component.html',
  styleUrls: ['./idp-login.component.css']
})
export class IdpLoginComponent implements OnInit {
  user: any;
  googleUser: any;
  fbUser: any;
  constructor(private socialAuthService: AuthService,
    public userService: UserService,
    private playerService: PlayerService,
    private adminService: AdminService) { }

  ngOnInit() {
    this.socialAuthService.authState.subscribe(r => {
      if (r == undefined || r == null) return;
      if (r.provider = 'google') {
        this.googleUser = r;
        this.loadUser(this.googleUser);
      }

      if (r.provider == 'facebook') {
        this.fbUser = r;
        this.loadUser(this.fbUser);
      }
    });
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
        this.loadUser(userData);
      }
    );
  }

  private loadUser(userData) {
    this.user = userData;
    let localIsAdmin = false;
    let localUserData = undefined;
    if (this.user == undefined || this.user.email == undefined || this.user.email == '') return;
    this.userService.setUser(userData);
    this.adminService.isAdmin(this.user.email).subscribe(isAdmin => {
      localIsAdmin = isAdmin;
      this.userService.setUser(this.user, isAdmin);
    });
    this.playerService.getPlayers().subscribe(players => {
      players.forEach(player => {
        let userEmail = this.user.email;
        if (player.accounts == undefined) return;
        player.accounts.forEach(account => {
          if (this.lowerLogin(account) == userEmail) {
            this.userService.setAssociatedPlayer(player);
          }
        })
      });
    });
  }

  private lowerLogin(login) {
    if (login == undefined) return undefined;
    if (typeof (login) == 'string') {
      return login.toLowerCase();
    }
    return undefined;
  }

}
