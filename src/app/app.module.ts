import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { ScoreService } from './score.service';
import { AdminService } from './admin.service';
import { StateService } from './state.service';

import { AdminGuard } from './admin.guard';
import { AuthGuard } from './auth.guard';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { OAuthModule } from 'angular-oauth2-oidc';

import * as env from '../environments/environment';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from "angular-6-social-login";
import { UserFormComponent } from './user-form/user-form.component';
import { ScoreEntryComponent } from './score-entry/score-entry.component';
import { IdpLoginComponent } from './idp-login/idp-login.component';
import { ManageAdminsComponent } from './manage-admins/manage-admins.component';
import { RulesComponent } from './rules/rules.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ScoreListComponent } from './score-list/score-list.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';

const appRoutes: Routes = [
  { path: 'score', component: ScoreEntryComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'admins', component: ManageAdminsComponent, canActivate: [AdminGuard] },
  { path: 'player', component: UserFormComponent, canActivate: [AdminGuard] },
  { path: 'player/new', component: UserFormComponent, canActivate: [AdminGuard] },
  { path: 'scores', component: ScoreListComponent, canActivate: [AuthGuard] },
  { path: 'rules', component: RulesComponent },
  { path: 'privacy', component: PrivacyComponent },
  // { path: '', component: LadderListComponent, pathMatch: 'full' }
  { path: '', component: HomeComponent, pathMatch: 'full' }
]

// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: FacebookLoginProvider.PROVIDER_ID,
        provider: new FacebookLoginProvider(env.environment.fbId)
      },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider(env.environment.googleId)
      }
    ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LadderListComponent,
    AdminComponent,
    UserFormComponent,
    ScoreEntryComponent,
    IdpLoginComponent,
    ManageAdminsComponent,
    RulesComponent,
    PrivacyComponent,
    ScoreListComponent,
    HomeComponent,
    HeaderComponent
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
    FormsModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    DragDropModule,
    MatTableModule,
    OAuthModule.forRoot()
  ],
  providers: [
    LadderService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AuthService,
    UserService,
    ScoreService,
    AdminService,
    StateService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
