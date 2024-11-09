import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { User } from '../userData';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <h2>List of All Users</h2>
      <a [routerLink]="['/addNewUser']">
        <button class="primary">Add New User</button>
      </a>
    </section>
  `,
  styleUrl: './users-list.component.css',
})
export class UsersListComponent {
  users: User[] = [];
  usersService: UsersService = inject(UsersService);

  constructor() {
    this.usersService.getAllUsers().then((users: User[]) => {
      this.users = users;
      console.log(this.users);
    });
  }
}
