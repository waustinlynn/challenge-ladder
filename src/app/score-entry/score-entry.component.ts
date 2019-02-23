import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as helpers from '../helpers';

import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';
import { combineLatest } from 'rxjs';
import { ScoreService } from '../score.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-score-entry',
  templateUrl: './score-entry.component.html',
  styleUrls: ['./score-entry.component.css']
})
export class ScoreEntryComponent implements OnInit {
  players: any[];
  displayPlayers: any[];
  score: string;
  winner: string = '';
  opponent: string = '';
  error: string;
  showAllPlayers: boolean = false;
  playerNameLookup: Map<string, string>;
  constructor(private playerService: PlayerService,
    private userService: UserService,
    private ladderService: LadderService,
    private scoreService: ScoreService,
    private router: Router) { }

  ngOnInit() {

    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(r => {
      this.players = r;
      this.refrehPlayerList();
    });

    this.userService.permissions.subscribe(r => {
      this.showAllPlayers = r.admin;
      this.refrehPlayerList();
    });
  }

  refrehPlayerList() {
    if (this.players == undefined || this.players.length == 0) return;
    this.playerNameLookup = new Map<string, string>();
    let availablePlayers = this.players;

    if (!this.showAllPlayers) {

      //find out the index for this user's player so we can trim the available list
      this.players.forEach((el, idx) => {
        if (this.userService.isMyPlayer(el)) {
          this.bindPlayerListToLookup(this.getPlayerSlice(idx, 5));
        }
      });
    } else {
      this.bindPlayerListToLookup(this.players);
    }

    this.displayPlayers = [];
    this.playerNameLookup.forEach((label, value) => {
      this.displayPlayers.push({ label, value });

    });
  }

  private bindPlayerListToLookup(playerList: any[]) {
    playerList.forEach(player => {
      let label = `${player.firstName} ${player.lastName}`;
      let value = player.id;
      this.playerNameLookup.set(value, label);
    });
  }

  private getPlayerSlice(index: number, offset: number) {
    let bottom = index - offset;
    bottom = bottom < 0 ? 0 : bottom;
    let top = index + offset + 1;
    top = top > this.players.length ? this.players.length : top;
    return this.players.slice(bottom, top);
  }

  save() {
    if (!this.userService.isAdmin && (!this.userService.isMyPlayer({ id: this.winner }) && !this.userService.isMyPlayer({ id: this.opponent }))) {
      this.error = 'One player must be associated with your account to enter this score';
      return;
    } else {
      this.error = undefined;
    }
    let pl = {
      score: this.score,
      winner: this.winner,
      winnerName: this.playerNameLookup.get(this.winner),
      opponentName: this.playerNameLookup.get(this.opponent),
      opponent: this.opponent
    }
    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(players => {
      let rankingsDone = false;
      let scoreDone = false;
      let router = this.router;
      function isDone() {
        if (rankingsDone && scoreDone) {
          router.navigate(['/']);
        }
      }
      this.ladderService.updateRankings(this.winner, this.opponent, players).subscribe(r => {
        rankingsDone = true;
        isDone();
      });
      this.scoreService.saveScore(pl).subscribe(r => {
        scoreDone = true;
        isDone();
      });
    });

  }

}
