import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() onUserSave: EventEmitter<any> = new EventEmitter();
  @Input() user: any = {};
  linkedAccount: string;
  title: string;
  constructor(private playerService: PlayerService, private router: Router) {
  }

  setUpUser(newUser: boolean) {
    if (newUser) {
      this.title = 'Add Player';
      this.user.accounts = [];
      return;
    }

    if (this.playerService.getEditUser != undefined) {
      this.title = 'Edit Player';
      this.user = this.playerService.getEditUser;
      if (this.user.accounts == undefined) {
        this.user.accounts = [];
      }
    }
  }

  ngOnInit() {
    this.setUpUser(this.router.url.includes('new'));
  }

  deleteAccount(account) {
    let idx = this.user.accounts.indexOf(account);
    if (idx > -1) {
      this.user.accounts.splice(idx, 1);
    }
    this.playerService.savePlayer(this.user).subscribe(r => r);
  }

  addAccount() {
    if (this.linkedAccount == undefined || this.linkedAccount == '') return;
    this.user.accounts.push(this.linkedAccount);
    this.linkedAccount = undefined;
    if (this.user.id != undefined) {
      this.playerService.savePlayer(this.user).subscribe(r => r);
    }
  }

  save() {
    if (this.linkedAccount != undefined && this.linkedAccount != '') {
      this.user.accounts.push(this.linkedAccount);
    }
    this.playerService.savePlayer(this.user).subscribe(r => {
      this.playerService.markUserForEdit(undefined);
      this.router.navigate(['/admin']);
    });
  }

  validateProperty(property: string) {
    if (property == undefined || property == '') return false;
  }

  addAccountInput() {
    console.log(this.user.accounts);
    if (this.user.accounts.some(r => r == '')) return;
    this.user.accounts.push('');
  }

}
