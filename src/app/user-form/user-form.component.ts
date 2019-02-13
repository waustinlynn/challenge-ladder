import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {Router} from '@angular/router';
import {PlayerService} from '../player.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() onUserSave: EventEmitter<any> = new EventEmitter();
  @Input() user: any = {};
  title: string;
  constructor(private playerService: PlayerService, private router: Router) {
    if(this.playerService.getEditUser != undefined){
      this.title = 'Edit Player';
      this.user = this.playerService.getEditUser;
    }else{
      this.title = 'Add Player';
    }
  }

  ngOnInit() {
  }

  save() {
    this.playerService.savePlayer(this.user).subscribe(r => {
      this.playerService.markUserForEdit(undefined);
      this.router.navigate(['/admin']); 
    });
  }

  validateProperty(property: string) {
    if (property == undefined || property == '') return false;
  }

}
