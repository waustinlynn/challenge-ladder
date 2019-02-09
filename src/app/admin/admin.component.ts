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

  isAddingUser: boolean = false;
  players: any[];
  temp: any;
  showDetails: boolean = false;

  constructor(private ladderService: LadderService,
    private playerService: PlayerService,
    private router: Router) { }

  ngOnInit() {
    this.playerService.getPlayers().subscribe(r => {
      this.players = r as any[];
    })

  }

  addUser() {
    this.isAddingUser = true;
  }

  saveUser(event) {
    this.isAddingUser = false;
    console.log(event);
    this.playerService.savePlayer(event).subscribe(r => console.log(r));
  }

  editPlayer(player) {
    this.playerService.markPlayerEdit(player);
    this.router.navigate(['/admin']);
  }

  drop(event) {
    console.log(this.players);
    this.players = helpers.moveItemInArray(this.players, event.previousIndex, event.currentIndex);
    console.log(this.players);
  }

  showHideDetails() {
    this.showDetails = !this.showDetails;
  }

}
