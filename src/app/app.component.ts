import { Component, OnInit } from '@angular/core';

import { User } from './user';
import { UserService } from './app.services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserService ],
  // styleUrls: ['./app.component.scss']
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Usuários';
  users:any = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    let self = this;

      this.userService.getUsers().subscribe((data: {}) => {
        self.users = data;
      });
  }
}
