import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import { Observable, Observer } from 'rxjs';
import { DocTypes } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admins: string[];
  checkedUser: string;
  apiUrl = env.environment.apiUrl;
  constructor(private http: HttpClient) {
    this.getAdmins().subscribe(r => this.admins = r.admins);
  }

  getAdmins() {
    return Observable.create(obs => this.http.get(`${env.environment.apiUrl}doc/${DocTypes.ADMIN}`).subscribe(r => {
      obs.next(r);
      obs.complete();
    }));
  }

  saveAdmin(admin) {
    let pl = { ...admin, docType: DocTypes.ADMIN }
    return this.http.post(`${env.environment.apiUrl}docs`, pl);
  }

  isAdmin(email, retries = 0) {
    if(this.admins == undefined){
      if(retries < 5){
        retries++;
        return this.isAdmin(email, retries);
      }
      return Observable.create((obs: Observer<boolean>) => {
        obs.next(false);
        obs.complete();
      })
    }
    return this._isAdminObs(email);
  }

  private _isAdminObs(email){
    return Observable.create((obs: Observer<boolean>) => {
      if(this.checkedUser != undefined){
        obs.next(this.checkedUser == email);
        obs.complete();
        return;
      }
      this.checkedUser = email;
      if (this.admins.indexOf(email) > -1){
        obs.next(true);
        obs.complete();
        return;
      }
      obs.next(false);
      obs.complete();
    });
  }
}
