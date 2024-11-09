import { Injectable } from '@angular/core';
import { User, Address } from './userData';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:3000/api';

  async getAllUsers(): Promise<User[]> {
    const data = await fetch(`${this.url}/persons`);
    const response = await data.json();
    console.log('res:', response);
    return response ?? [];
  }

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
