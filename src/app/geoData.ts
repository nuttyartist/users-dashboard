export interface Country {
  id: number;
  name: string;
  cities: City[];
}

export interface City {
  name: string;
}
