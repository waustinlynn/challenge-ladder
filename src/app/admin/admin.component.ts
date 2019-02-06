import { Component, OnInit } from '@angular/core';

import { LadderService } from '../ladder.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  isAddingUser: boolean = false;
  players: any[];

  constructor(private ladderService: LadderService) { }

  ngOnInit() {
    this.players = this.ladderService.loadData();
  }

  addUser() {
    this.isAddingUser = true;
  }

  saveUser(event) {
    this.isAddingUser = false;
    console.log(event);
  }

}
