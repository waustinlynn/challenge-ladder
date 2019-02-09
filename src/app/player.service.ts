import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import { DocTypes } from './constants';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private http: HttpClient) { }

  private _playerEditing: any;

  markPlayerEdit(player: any): any {
    this._playerEditing = player;
  }

  get playerEditing() {
    return this._playerEditing;
  }

  getPlayers() {
    return this.http.get(`${env.environment.apiUrl}docs/player`);
  }

  savePlayer(player) {
    let pl = { ...player, docType: DocTypes.PLAYER }
    return this.http.post(`${env.environment.apiUrl}docs`, pl);
  }
}
