import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';
import * as helpers from './helpers';
import { DocTypes } from './constants';

@Injectable({
  providedIn: 'root'
})
export class LadderService {
  players: any[];
  constructor(private http: HttpClient) {
  }

  public getRankings() {
    return Observable.create((obs: Observer<any>) => {
      this.http.get(`${env.environment.apiUrl}doc/${DocTypes.RANKINGS}`).subscribe((r: any) => {
        if (r != undefined && r.rankings != undefined) {
          obs.next(r.rankings);
          obs.complete();
        } else {
          obs.next([]);
          obs.complete();
        }

      });
    });
  }

  public saveRankings(newRankings) {
    return Observable.create((observer: Observer<any>) => {
      this._updateRankings(newRankings).subscribe(r => {
        observer.next(newRankings);
        observer.complete();
      })
    })
  }

  public updateRankings(winnerId: string, loserId: string, data: any[]) {
    return Observable.create((observer: Observer<any[]>) => {

      let winnerIndex = 0;
      let loserIndex = 0;
      data.forEach((el, idx) => {
        if (winnerId == el.id) {
          winnerIndex = idx;
        }

        if (loserId == el.id) {
          loserIndex = idx;
        }
      });
      if (loserIndex > winnerIndex) return;
      let newRankings = helpers.moveItemInArray(data, winnerIndex, loserIndex);
      this._updateRankings(newRankings).subscribe(r => {
        observer.next(newRankings);
        observer.complete();
      });
    });

  }

  private _updateRankings(newRankings) {
    let pl = { docType: DocTypes.RANKINGS, rankings: newRankings };
    return this.http.post(`${env.environment.apiUrl}docs`, pl);
  }
}
