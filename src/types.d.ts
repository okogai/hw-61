export interface Country {
  alpha3Code: string;
  name: string;
}

export interface CountryDetailsProps {
  name: string;
  capital: string;
  population: number;
  flag: string;
  borders: string[];
}