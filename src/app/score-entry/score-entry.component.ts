import { Component, OnInit } from '@angular/core';

import { LadderService } from '../ladder.service';

@Component({
  selector: 'app-score-entry',
  templateUrl: './score-entry.component.html',
  styleUrls: ['./score-entry.component.css']
})
export class ScoreEntryComponent implements OnInit {

  players: any[];
  playerNames: string[];
  score: string;
  winner: string;
  opponent: string;
  constructor(private ladderService: LadderService) { }

  ngOnInit() {
    this.players = this.ladderService.loadData();
    this.playerNames = this.players.map(r => {
      return `${r.firstName} ${r.lastName}`;
    });
  }

  save() {
    let pl = {
      score: this.score,
      winner: this.winner,
      opponent: this.opponent
    }
    console.log(pl);
  }

}
