import { Injectable } from '@angular/core';
import * as env from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { DocTypes } from './constants';
@Injectable({
  providedIn: 'root'
})
export class ScoreService {
  private _apiUrl;

  constructor(private http: HttpClient) {
    this._apiUrl = env.environment.apiUrl;
  }

  saveScore(score) {
    let pl = { ...score, docType: DocTypes.SCORE };
    return Observable.create((obs: Observer<any>) => {
      this.http.post(`${this._apiUrl}docs`, pl).subscribe(r => {
        obs.next(pl);
        obs.complete();
      });
    });
  }

  getScores() {
    return Observable.create((obs: Observer<any[]>) => {
      this.http.get(`${this._apiUrl}docs/${DocTypes.SCORE}`).subscribe(r => {
        obs.next(r as any[]);
        obs.complete();
      });
    });
  }
}
