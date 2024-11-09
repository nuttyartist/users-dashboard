import { Component, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { User, Address } from '../userData';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [],
  template: ` <section></section> `,
  styleUrl: './add-new-user.component.css',
})
export class AddNewUserComponent {
  usersService: UsersService = inject(UsersService);
}
