import { Component, OnInit, Input } from '@angular/core';
import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';
import { UserService } from '../user.service';
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
  rankings: any[];
  displayRankings: any[];
  isLoading: boolean = false;
  players: any[];
  playerNameLookup: Map<string, string>;

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
      }
    });

    combineLatest(
      helpers.getRankedUserList(this.playerService, this.ladderService),
      this.scoreService.getScores(),
      this.playerService.getPlayers()
    ).subscribe(([rankedList, scores, players]) => {
      this.displayRankings = rankedList as any[];
      this.displayRankings = helpers.combineScoresWithDisplayRankings(this.displayRankings, scores as any[]);
      this.isLoading = false;
    })
  }
}
