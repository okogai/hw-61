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

export interface Weather {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
}
