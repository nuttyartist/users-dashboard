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

      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Name</th>
            <th>Birthdate</th>
            <th>Addresses Count</th>
          </tr>
        </thead>
        <tbody>
          @for (user of users; track $index) {
          <tr>
            <td>{{ user.id }}</td>
            <td>{{ user.name }}</td>
            <td>{{ user.birthdate }}</td>
            <td>{{ user.addresses.length }}</td>
          </tr>
          }
        </tbody>
      </table>
    </section>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
      }

      th,
      td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #f4f4f4;
        font-weight: bold;
      }

      tr:hover {
        background-color: #f5f5f5;
      }

      .primary {
        margin-bottom: 20px;
      }
    `,
  ],
})
export class UsersListComponent {
  users: User[] = [];
  usersService: UsersService = inject(UsersService);

  constructor() {
    this.usersService.getAllUsers().then((users: User[]) => {
      this.users = users;
    });
  }
}
