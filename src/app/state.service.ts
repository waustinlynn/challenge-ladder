import { Injectable } from '@angular/core';
import { PlayerService } from './player.service';
import { LadderService } from './ladder.service';
import { ScoreService } from './score.service';
import { combineLatest, BehaviorSubject, Observable, Observer } from 'rxjs';
import * as helpers from './helpers';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private _rankedPlayers: any[];
  rankedPlayers: BehaviorSubject<any[]>;
  private _scores: any[];
  scores: BehaviorSubject<any[]>;
  private _players: any[];
  players: BehaviorSubject<any[]>;

  private _isReloading: boolean;

  constructor(private playerService: PlayerService,
    private ladderService: LadderService,
    private scoreService: ScoreService) {
    this._players = [];
    this._scores = [];
    this._rankedPlayers = [];
    this.rankedPlayers = new BehaviorSubject([]);
    this.scores = new BehaviorSubject([]);
    this.players = new BehaviorSubject([]);
    this._reload();
  }

  private _reload() {
    this._isReloading = true;
    combineLatest(
      helpers.getRankedUserList(this.playerService, this.ladderService),
      this.scoreService.getScores(),
      this.playerService.getPlayers()
    ).subscribe(([rankedList, scores, players]) => {
      this._rankedPlayers = (rankedList as any[]);
      this.rankedPlayers.next(this._rankedPlayers);
      this._scores = (scores as any[]);
      this.scores.next(this._scores);
      this._players = (players as any[]);
      this.players.next(this._players);
      this._isReloading = false;
    });
  }

  getPlayerMap() {
    return Observable.create((obs: Observer<any>) => {
      // if (this._isReloading) {
      this.players.subscribe(players => {
        obs.next(this._createPlayerMap(players));
      });
      // } else {
      // obs.next(this._createPlayerMap(this._players));
      // obs.complete();
      // }
    });
  }

  getScores() {
    return Observable.create((obs: Observer<any[]>) => {
      if (this._isReloading) {
        this.scores.subscribe(r => {
          obs.next(r);
        });
      } else {
        obs.next(this._scores);
        obs.complete();
      }
    });
  }

  private _createPlayerMap(players: any[]) {
    let map = {} as any;
    players.forEach(player => {
      map[player.id] = player;
    });
    return map;
  }

  triggerReload() {
    this._reload();
  }


}
