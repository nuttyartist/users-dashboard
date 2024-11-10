import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `<article>
    <form [formGroup]="addressForm">
      <label for="name">Address Name</label>
      <input id="name" type="text" />
      <br />
      <label for="birthdate">Select country</label>
      <select name="countries">
        <option value="israel">Israel</option>
        <option value="france">France</option>
        <option value="usa">U.S.A</option>
      </select>
      <label for="birthdate">Select city</label>
      <select name="cities">
        <option value="telAviv">Tel Aviv</option>
        <option value="haifa">Haifa</option>
      </select>
      <label for="name">Street</label>
      <input id="streer" type="text" />
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
  @Output() removeAddress = new EventEmitter();

  onRemove() {
    this.removeAddress.emit();
  }
}
