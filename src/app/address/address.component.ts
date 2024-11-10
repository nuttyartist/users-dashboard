import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Country, City } from '../geoData';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
      <button>Add city</button>
      <br />
      <label for="name">Street</label>
      <input id="streer" type="text" formControlName="street" />
      <br />
      <Br />
      <button (click)="onRemove()">Remove address</button>
      <br />
      <br />
    </form>
  </article> `,
  styleUrl: './address.component.css',
})
export class AddressComponent {
  @Input() addressForm!: FormGroup;
  @Input() availableCountries: Country[] = [];
  @Output() removeAddress = new EventEmitter();

  selectedCountryCities: City[] = [];

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

    this.selectedCountryCities = countryObj.cities;
  }

  onRemove() {
    this.removeAddress.emit();
  }
}
