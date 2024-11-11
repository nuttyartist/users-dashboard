export interface Address {
  addressName: string;
  street: string;
  cityId: string;
  countryId: string;
}

export interface User {
  name: string;
  birthDate: Date;
  addresses: Address[];
}
