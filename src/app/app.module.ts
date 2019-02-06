import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LadderListComponent } from './ladder-list/ladder-list.component';
import { LadderService } from './ladder.service';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

import { OAuthModule } from 'angular-oauth2-oidc';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  // FacebookLoginProvider,
} from "angular-6-social-login";

const appRoutes: Routes = [
  { path: 'admin', component: AdminComponent },
  { path: '', component: LadderListComponent, pathMatch: 'full' }
]

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      // {
      //   id: FacebookLoginProvider.PROVIDER_ID,
      //   provider: new FacebookLoginProvider("Your-Facebook-app-id")
      // },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("46706216165-vsio8k4d16i3svrpd537raqbgqe6p0tc.apps.googleusercontent.com")
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LadderListComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    SocialLoginModule,
    HttpClientModule,
    OAuthModule.forRoot()
  ],
  providers: [
    LadderService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthService,
    UserService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
