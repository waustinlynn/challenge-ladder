import { Component, OnInit, Input } from '@angular/core';
import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';
import { UserService, UserPermissions } from '../user.service';
import * as helpers from '../helpers';
import { combineLatest } from 'rxjs';
import { ScoreService } from '../score.service';

@Component({
  selector: 'ladder-list',
  templateUrl: './ladder-list.component.html',
  styleUrls: ['./ladder-list.component.css']
})
export class LadderListComponent implements OnInit {
  user: any;
  userPermissions: UserPermissions;

  rankings: any[];
  displayRankings: any[];
  isLoading: boolean = false;
  players: any[];
  playerNameLookup: Map<string, string>;
  isReadonly: boolean;

  constructor(private ladderService: LadderService,
    private userService: UserService,
    private playerService: PlayerService,
    private scoreService: ScoreService) {

  }


  ngOnInit() {
    this.isLoading = true;
    this.userService.authenticated.subscribe(isValid => {
      if (isValid) {
        this.user = this.userService.user;
        this.checkSetMyPlayer();
      }
    });

    this.userService.permissions.subscribe(permissions => {
      this.userPermissions = permissions;
    });

    combineLatest(
      helpers.getRankedUserList(this.playerService, this.ladderService),
      this.scoreService.getScores(),
      this.playerService.getPlayers()
    ).subscribe(([rankedList, scores, players]) => {
      this.displayRankings = rankedList as any[];
      this.displayRankings = helpers.combineScoresWithDisplayRankings(this.displayRankings, scores as any[]);
      this.checkSetMyPlayer();
      this.isLoading = false;
    })
  }

  private checkSetMyPlayer() {
    if (this.user == undefined) return;
    if (this.displayRankings == undefined || this.displayRankings.length == 0) return;
    setTimeout(() => {
      this._setMyPlayer();
      setTimeout(() => {
        this._setMyPlayer();
      }, 1000);
    }, 100);
  }

  private _setMyPlayer() {
    this.displayRankings = this.displayRankings.map(el => {
      if (this.userService.isMyPlayer(el)) {
        return { ...el, myPlayer: true };
      }
      return el;
    });
  }
}
