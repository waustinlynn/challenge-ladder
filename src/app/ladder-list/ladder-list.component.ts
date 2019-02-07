import { Component, OnInit, Input } from '@angular/core';
import { LadderService } from '../ladder.service';
import { UserService } from '../user.service';

@Component({
  selector: 'ladder-list',
  templateUrl: './ladder-list.component.html',
  styleUrls: ['./ladder-list.component.css']
})
export class LadderListComponent implements OnInit {
  user: any;
  data: any[];

  constructor(private ladderService: LadderService, private userService: UserService) {

  }


  ngOnInit() {
    this.userService.authenticated.subscribe(isValid => {
      if (isValid) {
        this.user = this.userService.user;
      }
    });

    this.ladderService.rankings.subscribe(r => {
      this.data = r.map((el, idx) => {
        return { ...el, position: idx + 1 };
      });
    })
  }

}
