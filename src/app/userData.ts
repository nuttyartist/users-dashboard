export interface Address {
  addressName: string;
  street: string;
  city: string;
  country: string;
}

export interface User {
  id: number;
  name: string;
  birthDate: string;
  addresses: Address[];
}
