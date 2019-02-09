import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as helpers from '../helpers';

import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';

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
  constructor(private playerService: PlayerService,
    private ladderService: LadderService,
    private router: Router) { }

  ngOnInit() {
    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(r => {
      this.players = r as any[];
      this.displayPlayers = this.players.map(r => {
        return { label: `${r.firstName} ${r.lastName}`, value: r.id };
      });
    });
  }

  save() {
    let pl = {
      score: this.score,
      winner: this.winner,
      opponent: this.opponent
    }
    this.ladderService.updateRankings(this.winner, this.opponent, this.players).subscribe(r => {
      this.router.navigate(['/']);
    })
  }

}
