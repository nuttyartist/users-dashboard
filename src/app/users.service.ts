import { Injectable } from '@angular/core';
import { User, Address } from './userData';
import { Country, City } from './geoData';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:3000/api';

  async getAvailableCountries(): Promise<Country[]> {
    const data = await fetch(`${this.url}/countries`);
    return (await data.json()) ?? [];
  }

  async getAvailableCities(countryId: number): Promise<City[]> {
    const data = await fetch(`${this.url}/cities/${countryId}`);
    return (await data.json()) ?? [];
  }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/persons`);
    const response = await data.json();
    console.log('res:', response);
    return response ?? [];
  }

  // Unnecessary at the moment?
  async getUserById(id: number): Promise<User> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? [];
  }

  submitNewUser(user: User) {
    console.log(
      `New user created: id: ${user.id}, name: ${user.name}, birthDate: ${user.birthDate}.`
    );
    // print addresses
    user.addresses.forEach((address: Address) => {
      console.log(
        `Address: addressName: ${address.addressName}, street: ${address.street}, city: ${address.city}, country: ${address.country}.`
      );
    });
  }
}
