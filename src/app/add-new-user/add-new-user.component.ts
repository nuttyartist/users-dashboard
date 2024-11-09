import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User, Address } from '../userData';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <article>
      <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" />
        <label for="birthdate">Birthdate</label>
        <input id="birthdate" type="text" formControlName="birthdate" />
        <button type="submit" class="primary">Save</button>
      </form>
    </article>
  `,
  styleUrl: './add-new-user.component.css',
})
export class AddNewUserComponent {
  usersService: UsersService = inject(UsersService);
  applyForm = new FormGroup({
    name: new FormControl(''),
    birthdate: new FormControl(''),
  });

  submitApplication() {
    console.log('here');
  }
}
