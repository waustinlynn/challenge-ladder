import { Component, OnInit } from '@angular/core';

import { LadderService } from '../ladder.service';

@Component({
  selector: 'app-score-entry',
  templateUrl: './score-entry.component.html',
  styleUrls: ['./score-entry.component.css']
})
export class ScoreEntryComponent implements OnInit {

  players: any[];
  score: string;
  winner: string = '';
  opponent: string = '';
  constructor(private ladderService: LadderService) { }

  ngOnInit() {
    this.players = this.ladderService.loadData().map(r => {
      return { label: `${r.firstName} ${r.lastName}`, value: r.id };
    });
  }

  save() {
    let pl = {
      score: this.score,
      winner: this.winner,
      opponent: this.opponent
    }
    this.ladderService.updateRankings(this.winner, this.opponent);
    console.log(pl);
  }

}
