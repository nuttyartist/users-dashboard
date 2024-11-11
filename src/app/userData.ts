export interface Address {
  addressName: string;
  street: string;
  cityId: string;
  countryId: string;
}

export interface User {
  id: number;
  name: string;
  birthdate: Date;
  addresses: Address[];
}
