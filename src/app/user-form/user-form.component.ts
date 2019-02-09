import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  @Output() onUserSave: EventEmitter<any> = new EventEmitter();
  user: any;
  title: string;
  constructor() {
    this.user = {};
    this.title = 'Add User';
  }

  ngOnInit() {
  }

  save() {
    this.onUserSave.emit(this.user);
  }

  validateProperty(property: string) {
    if (property == undefined || property == '') return false;
  }

}
