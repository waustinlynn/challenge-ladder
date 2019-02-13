import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import { DocTypes } from './constants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private _userForEdit: any;

  constructor(private http: HttpClient) { }

  getPlayers() {
    return Observable.create(obs => this.http.get(`${env.environment.apiUrl}docs/player`).subscribe(r => obs.next(r)));
  }

  savePlayer(player) {
    let pl = { ...player, docType: DocTypes.PLAYER }
    return this.http.post(`${env.environment.apiUrl}docs`, pl);
  }

  deletePlayer(id) {
    console.log(id);
    return this.http.delete(`${env.environment.apiUrl}doc/${DocTypes.PLAYER}/${id}`);
  }

  markUserForEdit(user){
    this._userForEdit = user;
  }

  get getEditUser(){
    return this._userForEdit;
  }
}
