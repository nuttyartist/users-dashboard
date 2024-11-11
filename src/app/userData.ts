export interface Address {
  addressName: string;
  street: string;
  city: string;
  country: string;
}

export interface User {
  name: string;
  birthDate: string;
  addresses: Address[];
}
