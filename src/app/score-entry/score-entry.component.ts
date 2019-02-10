import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as helpers from '../helpers';

import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';
import { combineLatest } from 'rxjs';
import { ScoreService } from '../score.service';

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
  playerNameLookup: Map<string, string>;
  constructor(private playerService: PlayerService,
    private ladderService: LadderService,
    private scoreService: ScoreService,
    private router: Router) { }

  ngOnInit() {
    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(r => {
      this.playerNameLookup = new Map<string, string>();
      this.players = r as any[];
      this.displayPlayers = this.players.map(r => {
        let label = `${r.firstName} ${r.lastName}`;
        let value = r.id;
        this.playerNameLookup.set(value, label);
        return { label, value };
      });
    });
  }

  save() {
    let pl = {
      score: this.score,
      winner: this.winner,
      winnerName: this.playerNameLookup.get(this.winner),
      opponentName: this.playerNameLookup.get(this.opponent),
      opponent: this.opponent
    }
    combineLatest(
      this.ladderService.updateRankings(this.winner, this.opponent, this.players),
      this.scoreService.saveScore(pl)
    ).subscribe(([ladder, score]) => this.router.navigate(['/']));
  }

}
