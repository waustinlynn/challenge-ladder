import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { combineLatest } from 'rxjs';
import { ScoreService } from '../score.service';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.css']
})
export class ScoreListComponent implements OnInit {

  recentScores: any[];
  displayedColumns: string[];
  constructor(private state: StateService) {
    this.displayedColumns = ['winner', 'opponent', 'score', 'datePlayed'];
  }

  ngOnInit() {
    combineLatest(this.state.getPlayerMap(), this.state.getScores())
      .subscribe(([playerMap, scores]) => {
        let scoresArr = (scores as any[]);
        scores = (scores as any[]);
        let validScores = [];
        for (let i = scoresArr.length - 1; i > -1; i--) {
          let score = scoresArr[i];
          if (playerMap[score['winner']] == undefined && playerMap[score['opponent']] == undefined) continue;
          let pl = {
            winner: score['winnerName'],
            opponent: score['opponentName'],
            score: score['score'],
            datePlayed: new Date(score['_ts'] * 1000).toLocaleDateString()
          }
          validScores.push(pl);
        }
        this.recentScores = validScores;
      });
  }

}
