import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})
export class AdminusersComponent implements OnInit {
  allUsers: Array<User> = [];
  usrs: any;

  constructor(private _userService: UserService, private router : Router) {
    router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
    this.usrs = this._userService.getAllUsers().subscribe(user => {
      this.allUsers = user;
    })
  }

  handleDelete(id:string) : void {
    this.usrs = this._userService.deleteUserById(id).subscribe(() => this.router.navigate(['/admin/users']))
  }

  ngOnDestroy(): void {
    if (this.usrs) this.usrs.unsubscribe();
  }

}
