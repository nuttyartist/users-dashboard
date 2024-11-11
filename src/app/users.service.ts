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
    console.log('countryId 0:', countryId);
    const data = await fetch(`${this.url}/cities/${countryId}`);
    return (await data.json()) ?? [];
  }

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/persons`);
    const response = await data.json();
    console.log('res:', response);
    return response ?? [];
  }

  async getCountryId(countryName: string): Promise<number> {
    const countries = await this.getAvailableCountries();
    const country = countries.find((c) => c.name.toLowerCase() === countryName);
    return country?.id ?? -1;
  }

  async getCityId(cityName: string, countryId: number): Promise<number> {
    if (countryId === -1) return 0;
    const cities = await this.getAvailableCities(countryId);
    const city = cities.find((c) => c.name.toLowerCase() === cityName);
    return city?.id ?? 0;
  }

  async addCity(cityData: City): Promise<City> {
    const response = await fetch(`${this.url}/city`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: cityData.name,
        countryId: cityData.countryId,
      }),
    });
    return await response.json();
  }

  // Unnecessary at the moment?
  async getUserById(id: number): Promise<User> {
    const data = await fetch(`${this.url}/${id}`);
    return (await data.json()) ?? [];
  }

  submitNewUser(user: User) {
    try {
      fetch(`${this.url}/person`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      return true;
    } catch (error) {
      console.error('Error submitting new user:', error);
      return false;
    }
  }
}
