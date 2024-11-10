import { Component } from '@angular/core';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [],
  template: `<article>
    <form>
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
      <button>Remove address</button>
      <br />
      <br />
    </form>
  </article> `,
  styleUrl: './address.component.css',
})
export class AddressComponent {}
