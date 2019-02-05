import { Component, OnInit, Input } from '@angular/core';
import { LadderService } from '../ladder.service';

@Component({
  selector: 'ladder-list',
  templateUrl: './ladder-list.component.html',
  styleUrls: ['./ladder-list.component.css']
})
export class LadderListComponent implements OnInit {
  panelOpenState = false;
  @Input() user: any;
  constructor(private ladderService: LadderService) {

    this.data = ladderService.loadData();
  }

  data: any[];

  ngOnInit() {
  }

}
