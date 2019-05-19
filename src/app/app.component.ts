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
  showForm = false;
  addLabel = "Incluir";
  crumb = "";
  editUser: User;

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

  delete(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.userService.deleteUser(user.nuCpf).subscribe();
  }

  disableUser(user: User): void {
    this.userService.disableUser(user).subscribe();
  }

  showAddUser(): void {
    console.log('aqui')
    this.showForm = this.showForm ? false : true;

    this.addLabel = this.showForm ? "Voltar" : "Incluir";
    this.crumb = this.showForm ? " > Incluir" : "";
  }

  add(user: User): void {
    this.editUser = undefined;
    console.log('User', user);
    // name = name.trim();
    // if (!name) { return; }

    // // The server will generate the id for this new hero
    // const newHero: Hero = { name } as Hero;
    // this.heroesService.addHero(newHero)
    //   .subscribe(hero => this.heroes.push(hero));
  }
}
