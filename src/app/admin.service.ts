import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import { Observable } from 'rxjs';
import { DocTypes } from './constants';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admins: string[];
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

  isAdmin(email) {
    if (this.admins.indexOf(email) > -1) return true;
    return false;
  }
}
