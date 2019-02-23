import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: any;
  private _isAdmin: boolean = false;
  private _associatedPlayer: any;
  private _oauthUsers: Map<string, any>;
  private _associatedPlayers: Map<string, any>;
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _userPermissions: UserPermissions;
  private _permissions: BehaviorSubject<UserPermissions>;
  private _isReadonly: boolean = true;
  constructor() {
    this._associatedPlayers = new Map<string, any>();
    this._oauthUsers = new Map<string, any>();
    this._userPermissions = new UserPermissions();
    this._permissions = new BehaviorSubject(this._userPermissions);
  }

  get permissions() {
    return this._permissions;
  }

  private updatePermissions(update: UserPermissions) {
    for (let prop in update) {
      this._userPermissions[prop] = update[prop];
    }
    this._permissions.next(this._userPermissions);
  }

  public setUser(user: any, provider: string, isAdmin: boolean = false) {
    this._user = user;
    this._oauthUsers.set(provider, user);
    if (!this._isAdmin) {
      this._isAdmin = isAdmin;
    }
    if (this._user != undefined) {
      this._authenticated.next(true);
      let updateObj = {
        authenticated: true
      } as UserPermissions;
      if (this._isAdmin) {
        updateObj.admin = true;
        updateObj.isReadonly = false;
      }
      if (!this.hasPlayer && !this._isAdmin) {
        updateObj.isReadonly = true;
      }
      this.updatePermissions(updateObj);
    }
  }

  setAssociatedPlayer(player) {
    this._associatedPlayers.set(player.id, player);
    this.updatePermissions({ isReadonly: false } as UserPermissions);
    this._hasPlayerObs.next(this.hasPlayer);
  }

  isMyPlayer(player) {
    return this._associatedPlayers.has(player.id);
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get hasPlayer() {
    return (this._associatedPlayers != undefined && this._associatedPlayers.size > 0);
  }

  private _hasPlayerObs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  get hasPlayerObs() {
    return this._hasPlayerObs;
  }

  get myPlayer() {
    return this._associatedPlayer;
  }

  get user() {
    return this._user;
  }

  get authenticated(): BehaviorSubject<boolean> {
    return this._authenticated;
  }

  get isReadonly(): boolean {
    return this._isReadonly;
  }
}

export class UserPermissions {
  authenticated: boolean = false;
  admin: boolean = false;
  isReadonly: boolean = false;
}
