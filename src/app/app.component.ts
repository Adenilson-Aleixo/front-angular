import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ UserService ]
})
export class AppComponent implements OnInit {
  title: 'Usuários';
  users: User[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }
}
