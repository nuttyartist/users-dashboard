import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { User, Address } from '../userData';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddressComponent],
  template: `
    <article>
      <form [formGroup]="newUserForm" (submit)="submitNewUser()">
        <label for="name">Name</label>
        <input id="name" type="text" formControlName="name" />
        <br />
        <label for="birthdate">Birthdate</label>
        <input id="birthdate" type="text" formControlName="birthdate" />
        <br />
        <br />
        @for (address of getUserAddresses().controls; track $index) {
        <app-address></app-address>
        }
        <button (click)="addNewAddress()">Add new address</button>
        <br />
        <Br />
        <button type="submit" class="primary" [disabled]="!newUserForm.valid">
          Save
        </button>
      </form>
    </article>
  `,
  styleUrl: './add-new-user.component.css',
})
export class AddNewUserComponent {
  usersService: UsersService = inject(UsersService);

  newUserForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    birthdate: new FormControl(''),
    addresses: new FormArray([]),
  });

  getUserAddresses() {
    return this.newUserForm.get('addresses') as FormArray;
  }

  addNewAddress() {
    let newUserAddress = new FormGroup({
      addressName: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      city: new FormControl(''),
      country: new FormControl(''),
    });

    this.getUserAddresses().push(newUserAddress);
  }

  submitNewUser() {
    // check if form is valid
    if (this.newUserForm.valid) {
    }
    console.log(this.newUserForm.value);
    console.log('here');
  }
}
