import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User, Address } from '../userData';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <form [formGroup]="addNewUserForm" (submit)="submitNewUser()">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" />
        <label for="birthdate">Birthdate</label>
        <input id="birthdate" type="text" formControlName="birthdate" />
        <br />
        <br />
        <button
          type="submit"
          class="primary"
          [disabled]="!addNewUserForm.valid"
        >
          Save
        </button>
      </form>
      <br />
      <button type="submit" class="primary">Add new address</button>
    </article>
  `,
  styleUrl: './add-new-user.component.css',
})
export class AddNewUserComponent {
  usersService: UsersService = inject(UsersService);
  addNewUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthdate: new FormControl(''),
  });

  submitNewUser() {
    // debug form values
    console.log(this.addNewUserForm.value);
    console.log('here');
  }
}
