import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { User } from './user';
import { UserService } from './app.services';
import { Window } from 'selenium-webdriver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ UserService ],
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Usuários';
  users:any = [];
  showForm = false;
  addLabel = "Incluir";
  crumb = "";
  editUser: User;
  icPerfil:any = ['Aluno', 'Gestor', 'Gestor Estadual', 'Gestor Nacional']

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

  getUsersFilter(user: User): void {
    let self = this;

    this.userService.getUsersFilter(user).subscribe((data: {}) => {
      self.users = data;
    });
  }

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user).subscribe();
  }

  disableUser(user: User): void {
    this.userService.disableUser(user).subscribe();
    window.location.reload(true);
  }

  showAddUser(): void {
    this.showForm = this.showForm ? false : true;

    this.addLabel = this.showForm ? "Voltar" : "Incluir";
    this.crumb = this.showForm ? " > Incluir" : "";
  }

  addUser(user: User): void {
    this.userService.addUser(user)
      .subscribe(user => this.users.push(user));
  }
}
