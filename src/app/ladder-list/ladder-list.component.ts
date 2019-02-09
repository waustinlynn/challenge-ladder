import { Component, OnInit, Input } from '@angular/core';
import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';
import { UserService } from '../user.service';
import * as helpers from '../helpers';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'ladder-list',
  templateUrl: './ladder-list.component.html',
  styleUrls: ['./ladder-list.component.css']
})
export class LadderListComponent implements OnInit {
  user: any;
  rankings: any[];
  displayRankings: any[];
  players: any[];

  constructor(private ladderService: LadderService,
    private userService: UserService,
    private playerService: PlayerService) {

  }


  ngOnInit() {
    this.userService.authenticated.subscribe(isValid => {
      if (isValid) {
        this.user = this.userService.user;
      }
    });

    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(r => this.displayRankings = r);
  }
}
