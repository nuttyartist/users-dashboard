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
        @for (country of availableCountries; track $index) {
        <option value="{{ country.name.toLowerCase() }}">
          {{ country.name }}
        </option>
        }
      </select>
      <label for="birthdate">Select city</label>
      <select formControlName="city">
        <option value="telAviv">Tel Aviv</option>
        <option value="haifa">Haifa</option>
      </select>
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

  onRemove() {
    this.removeAddress.emit();
  }
}
