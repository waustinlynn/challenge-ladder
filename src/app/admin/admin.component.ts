import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as helpers from '../helpers';

import { LadderService } from '../ladder.service';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  players: any[];
  temp: any;
  showDetails: boolean = false;
  detailsButtonLabel: string = 'Show Details';

  constructor(private ladderService: LadderService,
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
    this.loadPlayers();
  }

  private loadPlayers() {
    helpers.getRankedUserList(this.playerService, this.ladderService).subscribe(r => this.players = r);
  }

  editPlayer(player) {
    this.playerService.markUserForEdit(player);
    this.router.navigate(['/player']);
  }

  deletePlayer(player) {
    // console.log(player);
    this.playerService.deletePlayer(player.id).subscribe(r => this.loadPlayers());
  }

  drop(event) {
    this.players = helpers.moveItemInArray(this.players, event.previousIndex, event.currentIndex);
    this.ladderService.saveRankings(this.players).subscribe(r => this.loadPlayers());
  }
}
