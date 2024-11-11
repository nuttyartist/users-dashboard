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
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AddressComponent } from '../address/address.component';
import { Country, City } from '../geoData';

@Component({
  selector: 'app-add-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddressComponent],
  template: `
    <article>
      <h2>Add New User</h2>
      <form [formGroup]="newUserForm" (submit)="submitNewUser()">
        <div class="form-container">
          <div class="left-section">
            <label for="name">Name</label>
            <input id="name" type="text" formControlName="name" />

            <label for="birthdate">Birthdate</label>
            <input id="birthdate" type="date" formControlName="birthdate" />

            <div class="action-buttons">
              <button type="button" (click)="addNewAddress()">
                Add new address
              </button>
              <button
                type="submit"
                class="primary"
                [disabled]="
                  newUserForm.get('name')?.invalid || !hasValidAddress()
                "
              >
                Save
              </button>
            </div>
          </div>

          <div class="right-section">
            @for (address of getUserAddresses().controls; track $index) {
            <app-address
              [addressForm]="getAddressAsFormGroup(address)"
              (removeAddress)="removeAddress($index)"
              [availableCountries]="countries"
            ></app-address>
            }
          </div>
        </div>
      </form>
      @if (submitStatus === 'success') {
      <div class="success-message">User data submitted successfully!</div>
      } @if (submitStatus === 'error') {
      <div class="error-message">
        Failed to submit user data. Please try again.
      </div>
      }
    </article>
  `,
  styles: [
    `
      article {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }

      h2 {
        color: #2c3e50;
        text-align: center;
        font-size: 2em;
        margin-bottom: 30px;
      }

      .form-container {
        display: flex;
        gap: 40px;
      }

      .left-section {
        flex: 0 0 300px;
        align-self: flex-start; /* This prevents the section from stretching */
        position: sticky; /* Makes the section stick to the top */
        top: 20px; /* Distance from the top of the viewport */
      }

      .right-section {
        flex: 1;
      }

      .left-section label {
        display: block;
        margin-bottom: 5px;
        color: #2c3e50;
        font-weight: 500;
      }

      .left-section input {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1em;
        margin-bottom: 15px;
      }

      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-top: 20px;
      }

      button {
        background-color: #3498db;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1em;
        transition: background-color 0.3s;
        width: 100%;
      }

      button:hover {
        background-color: #2980b9;
      }

      button:disabled {
        background-color: #bdc3c7;
        cursor: not-allowed;
      }

      .success-message {
        background-color: #2ecc71;
        color: white;
        padding: 15px;
        border-radius: 4px;
        margin: 20px 0;
        text-align: center;
      }

      .error-message {
        background-color: #e74c3c;
        color: white;
        padding: 15px;
        border-radius: 4px;
        margin: 20px 0;
        text-align: center;
      }
    `,
  ],
})
export class AddNewUserComponent {
  usersService: UsersService = inject(UsersService);
  countries: Country[] = [];
  submitStatus: 'success' | 'error' | null = null;

  constructor() {
    this.addNewAddress();

    this.usersService.getAvailableCountries().then((countries: Country[]) => {
      this.countries = countries;
    });
  }

  newUserForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      birthdate: new FormControl(undefined),
      addresses: new FormArray<FormGroup>([]),
    },
    { validators: this.atLeastOneValidAddress() }
  );

  atLeastOneValidAddress(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      if (!(formArray instanceof FormArray)) {
        return null;
      }

      const hasValidAddress = formArray.controls.some(
        (control) => control.valid
      );
      return hasValidAddress ? null : { noValidAddresses: true };
    };
  }

  // TODO: Why do we need this? Why does the 'atLeastOneValidAddress' only works on the first address?
  hasValidAddress(): boolean {
    return this.getUserAddresses().controls.some((control) => control.valid);
  }

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

  removeAddress(index: number) {
    this.getUserAddresses().removeAt(index);
  }

  getAddressAsFormGroup(address: AbstractControl): FormGroup {
    return address as FormGroup;
  }

  async submitNewUser() {
    // check if form is valid
    if (this.newUserForm.valid) {
      const userAddresses: Address[] = [];
      const addresses = this.newUserForm.get('addresses')?.value;

      for (const address of addresses!) {
        const countryId = await this.usersService.getCountryId(
          address['country']
        );
        const cityId = await this.usersService.getCityId(
          address['city'],
          countryId
        );

        userAddresses.push({
          addressName: address['addressName'],
          street: address['street'],
          cityId: cityId.toString(),
          countryId: countryId.toString(),
        });
      }

      const user: User = {
        id: -1,
        name: this.newUserForm.get('name')?.value!,
        birthdate: this.newUserForm.get('birthdate')?.value!,
        addresses: userAddresses,
      };
      try {
        const result = this.usersService.submitNewUser(user);
        this.submitStatus = result ? 'success' : 'error';
      } catch (error) {
        this.submitStatus = 'error';
      }
    }
  }
}
