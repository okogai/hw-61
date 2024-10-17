export interface Country {
    alpha3Code: string;
    name: string;
}

export interface CountryDetail {
    alpha3Code: string;
    name: string;
    capital: string;
    population: number;
    region: string;
    borders: string[];
}