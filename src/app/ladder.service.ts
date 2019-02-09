import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as env from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LadderService {
  private _rankings: BehaviorSubject<any>;
  data: any[] = [
    { id: '1', firstName: 'austin', lastName: 'Smith', homeCourt: 'Fieldstone', email: 'test@test.com', phone: '555-555-5555' },
    { id: '2', firstName: 'trilla', lastName: 'Smith', homeCourt: 'The beach', email: 'test@test.com', phone: '555-555-5555' },
    { id: '3', firstName: 'nicole', lastName: 'Smith', homeCourt: 'Ashebrooke', email: 'test@test.com', phone: '555-555-5555' },
    { id: '4', firstName: 'william', lastName: 'Smith', homeCourt: 'Brookstone', email: 'test@test.com', phone: '555-555-5555' }
  ];
  constructor(private http: HttpClient) {
    this._rankings = new BehaviorSubject(this.data);
  }

  public loadData() {
    return this.data;
  }

  get rankings(): BehaviorSubject<any> {
    return this._rankings;
  }

  public updateRankings(winnerId: string, loserId: string) {
    let winnerIndex = 0;
    let loserIndex = 0;
    this.data.forEach((el, idx) => {
      if (winnerId == el.id) {
        winnerIndex = idx;
      }

      if (loserId == el.id) {
        loserIndex = idx;
      }
    });
    if (loserIndex > winnerIndex) return;
    let winnerRecord = { ...this.data[winnerIndex] };
    //split the rankings array into 3 arrays, excluding the winner record
    let top = this.data.slice(0, loserIndex);
    let mid = this.data.slice(loserIndex, winnerIndex);
    let bottom = this.data.slice(winnerIndex + 1, this.data.length);

    //concat those arrays back after adding the winner record to the end of the top array
    top.push(winnerRecord);
    let newRankings = top.concat(mid);
    newRankings = newRankings.concat(bottom);
    this._updateRankings(newRankings);
  }

  private _updateRankings(newRankings) {
    this.data = newRankings;
    console.log(newRankings);
    this._rankings.next(newRankings);
    // this.http.post(`${env.environment.apiUrl}docs`, newRankings).subscribe(r => {
    //   this._rankings.next(newRankings);
    // });
  }
}
