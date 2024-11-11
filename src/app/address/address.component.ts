import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country, City } from '../geoData';
import { AddCityComponent } from '../add-city/add-city.component';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AddCityComponent],
  template: `<article>
    <form [formGroup]="addressForm">
      <label for="name">Address Name</label>
      <input id="name" type="text" formControlName="addressName" />
      <br />
      <label for="birthdate">Select country</label>
      <select formControlName="country">
        <option value="">Select a country</option>
        @for (country of availableCountries; track $index) {
        <option value="{{ country.name.toLowerCase() }}">
          {{ country.name }}
        </option>
        }
      </select>
      <br />
      <label for="birthdate">Select city</label>
      <select formControlName="city">
        <option value="">Select a city</option>
        @for (city of selectedCountryCities; track $index) {
        <option value="{{ city.name.toLowerCase() }}">
          {{ city.name }}
        </option>
        }
      </select>
      <button (click)="showAddCityDialog()">Add city</button>
      <label for="name">Street</label>
      <input id="streer" type="text" formControlName="street" />
      <br />
      <br />
      <div class="button-container">
        <button class="redButton" (click)="onRemove()">Remove address</button>
      </div>
    </form>
    @if (isDialogVisible) {
    <app-add-city
      (closeDialog)="hideAddCityDialog()"
      (cityAdded)="onCityAdded($event)"
    ></app-add-city>
    }
  </article> `,
  styles: [
    `
      article {
        background-color: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      form {
        display: grid;
        grid-gap: 15px;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }

      label {
        display: block;
        margin-bottom: 5px;
        color: #2c3e50;
        font-weight: 500;
      }

      input,
      select {
        width: 100%;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1em;
      }

      button {
        background-color: #2ecc71;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #27ae60;
      }

      button[type='button'] {
        background-color: #e74c3c;
      }

      button[type='button']:hover {
        background-color: #c0392b;
      }

      .button-container {
        grid-column: 1 / -1; /* Makes the container span all columns */
        display: flex;
        justify-content: center;
        width: 100%;
      }

      .redButton {
        margin-top: 20px;
        background-color: #e74c3c;
        color: white;
        border: none;
        padding: 15px 40px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .redButton:hover {
        background-color: #c0392b;
      }
    `,
  ],
})
export class AddressComponent {
  @Input() addressForm!: FormGroup;
  @Input() availableCountries: Country[] = [];
  @Output() removeAddress = new EventEmitter();
  isDialogVisible = false;
  selectedCountryId: number = 0;
  selectedCountryName: string = '';
  usersService: UsersService = inject(UsersService);

  selectedCountryCities: City[] = [];

  showAddCityDialog() {
    console.log('showAddCityDialog');
    if (!this.selectedCountryId) {
      alert('Please select a country first');
      return;
    }
    this.isDialogVisible = true;
  }

  hideAddCityDialog() {
    this.isDialogVisible = false;
  }

  async onCityAdded(city: string) {
    const newCity: City = {
      id: -1,
      name: city,
      countryId: this.selectedCountryId,
    };
    await this.usersService.addCity(newCity);
    this.updateCitiesList(this.selectedCountryName);
    this.hideAddCityDialog();
  }

  ngOnInit() {
    this.addressForm
      ?.get('country')
      ?.valueChanges.subscribe((country: string) => {
        this.updateCitiesList(country);
      });
  }

  updateCitiesList(country: string) {
    const countryObj: Country = this.availableCountries.find(
      (c: Country) => c.name.toLowerCase() === country.toLowerCase()
    )!;

    if (countryObj) {
      this.selectedCountryName = countryObj.name;
      this.selectedCountryId = countryObj.id;

      this.usersService
        .getAvailableCities(countryObj.id)
        .then((cities: City[]) => {
          this.selectedCountryCities = cities;
        });
    }
  }

  onRemove() {
    this.removeAddress.emit();
  }
}
