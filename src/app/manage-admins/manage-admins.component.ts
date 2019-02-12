import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit {

  admins: string[];
  newAdmin: string;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadAdmins();
  }

  loadAdmins() {
    this.adminService.getAdmins().subscribe(r => {
      if (r == undefined) {
        this.admins = [];
        return;
      }
      this.admins = r.admins;
    })
  }

  deleteAdmin(admin) {
    let idx = this.admins.indexOf(admin);
    if (idx > -1) {
      this.admins.splice(idx, 1);
    }
    this._save();
  }

  save() {
    this.admins.push(this.newAdmin);
    this._save();
  }

  private _save() {
    this.adminService.saveAdmin({ admins: this.admins }).subscribe(r => {
      this.newAdmin = '';
      this.loadAdmins();
    });
  }

}
