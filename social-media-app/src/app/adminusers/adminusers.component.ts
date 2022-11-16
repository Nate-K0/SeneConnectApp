import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  allUsers: Array<User> = [];
  usrs: any;

  constructor(private _userService: UserService) { }

  ngOnInit(): void {
    this.usrs = this._userService.getAllUsers().subscribe(user => {
      this.allUsers = user;
    })
  }

  ngOnDestroy(): void {
    if (this.usrs) this.usrs.unsubscribe();
  }

}
