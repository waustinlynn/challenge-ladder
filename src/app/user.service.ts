import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user: any;
  private _associatedPlayer: any;
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() { }

  public setUser(user: any) {
    this._user = user;
    if (this._user != undefined) {
      this._authenticated.next(true);
    }
  }

  setAssociatedPlayer(player) {
    this._associatedPlayer = player;
  }

  isMyPlayer(player) {
    if (this._associatedPlayer == undefined) return false;
    console.log(this._associatedPlayer);
    return this._associatedPlayer.id == player.id;
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
