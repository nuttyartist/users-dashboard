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
      <br />
      <label for="name">Street</label>
      <input id="streer" type="text" formControlName="street" />
      <br />
      <Br />
      <button (click)="onRemove()">Remove address</button>
      <br />
      <br />
    </form>
    @if (isDialogVisible) {
    <app-add-city
      (closeDialog)="hideAddCityDialog()"
      (cityAdded)="onCityAdded($event)"
    ></app-add-city>
    }
  </article> `,
  styleUrl: './address.component.css',
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
    const newCity: City = { name: city, countryId: this.selectedCountryId };
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
