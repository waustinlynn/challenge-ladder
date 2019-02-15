import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: any;
  private _isAdmin: boolean = false;
  private _associatedPlayer: any;
  private _associatedPlayers: Map<string, any>;
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {
    this._associatedPlayers = new Map<string, any>();
  }

  public setUser(user: any, isAdmin: boolean = false) {
    this._user = user;
    this._isAdmin = isAdmin;
    if (this._user != undefined) {
      this._authenticated.next(true);
    }
  }

  setAssociatedPlayer(player) {
    this._associatedPlayers.set(player.id, player);
  }

  isMyPlayer(player) {
    return this._associatedPlayers.has(player.id);
  }

  get isAdmin() {
    return this._isAdmin;
  }

  get hasPlayer() {
    return this._associatedPlayer != undefined;
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
}
