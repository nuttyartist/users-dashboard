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
      h2 {
        color: #2c3e50;
        text-align: center;
        font-size: 2em;
        margin-bottom: 30px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      }

      th,
      td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #3498db;
        color: white;
        font-weight: 500;
      }

      tr:hover {
        background-color: #f5f7fa;
      }

      .primary {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s;
      }

      .primary:hover {
        background-color: #2980b9;
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
