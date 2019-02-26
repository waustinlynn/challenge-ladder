import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import { Observable, Observer } from 'rxjs';
import { DocTypes } from './constants';
import { unsupported } from '@angular/compiler/src/render3/view/util';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admins: string[];
  checkedUser: string;
  apiUrl = env.environment.apiUrl;
  constructor(private http: HttpClient) {
    this.getAdmins().subscribe(r => {
      if (r != undefined && r.admins != undefined) {
        this.admins = r.admins;
      }
    });
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
    if (this.admins == undefined) {
      if (retries < 5) {
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

  private _isAdminObs(email) {
    return Observable.create((obs: Observer<boolean>) => {
      // obs.next(true);
      // return;
      if (this.checkedUser != undefined && this.checkedUser == email) {
        obs.next(this._isAdmin(this.checkedUser));
        obs.complete();
        return;
      }
      this.checkedUser = email;
      obs.next(this._isAdmin(this.checkedUser));
      obs.complete();
    });
  }

  private _isAdmin(account) {
    if (this.admins == undefined || this.admins.length == 0) return false;
    return this.admins.indexOf(account) > -1;
  }

  saveLogin(user) {
    let pl = { ...user, docType: DocTypes.LOGIN }
    return this.http.post(`${env.environment.apiUrl}docs`, pl);
  }
}
