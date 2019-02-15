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
  playerNameLookup: Map<string, string>;
  constructor(private playerService: PlayerService,
    private userService: UserService,
    private ladderService: LadderService,
    private scoreService: ScoreService,
    private router: Router) { }

  ngOnInit() {
    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(r => {

      this.playerNameLookup = new Map<string, string>();
      this.players = r as any[];

      //find out the index for this user's player so we can trim the available list
      let myPlayersIndex = -1;
      this.players.forEach((el, idx) => {
        if (this.userService.isMyPlayer(el)) {
          myPlayersIndex = idx;
        }
      });

      let availablePlayers = [];
      let bottomIdx = myPlayersIndex - 4;
      bottomIdx = bottomIdx < 0 ? 0 : bottomIdx;
      let topIdx = myPlayersIndex + 5;
      topIdx = topIdx > this.players.length ? this.players.length : topIdx;
      availablePlayers = this.players.slice(bottomIdx, topIdx);


      this.displayPlayers = availablePlayers.map(r => {
        let label = `${r.firstName} ${r.lastName}`;
        let value = r.id;
        this.playerNameLookup.set(value, label);
        return { label, value };
      });
    });
  }

  save() {
    if (!this.userService.isMyPlayer({ id: this.winner }) || !this.userService.isMyPlayer({ id: this.opponent })) {
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
      function isDone() {
        if (rankingsDone && scoreDone) {
          this.router.navigate(['/']);
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
