import { Injectable } from '@angular/core';

import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService) {
    let config = new AuthConfig({
      clientId: '46706216165-vsio8k4d16i3svrpd537raqbgqe6p0tc.apps.googleusercontent.com',
      issuer: 'https://accounts.google.com',
      redirectUri: window.location.origin,
      scope: 'openid profile email',
      strictDiscoveryDocumentValidation: false,
      requireHttps: false
    });
    this.oauthService.configure(config);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  public login() {
    this.oauthService.initImplicitFlow();
    // this.oauthService.tryLogin().then(r =  > console.log(r));
  }
}
