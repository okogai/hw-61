import React from "react";
import { Country } from "../../types";
import CountryItem from "./CountryItem.tsx";

interface CountryInfo {
  countries: Country[];
  selectedCountry: string | null;
  onSelectCountry: (alpha3Code: string) => void;
}

const CountryList: React.FC<CountryInfo> = ({
  countries,
  selectedCountry,
  onSelectCountry,
}) => {
  return (
    <div
      className="overflow-auto"
      style={{
        maxHeight: "600px",
        border: "1px solid #ccc",
        borderRadius: "0.25rem",
      }}
    >
      <ul className="list-group">
        {countries.map((country) => (
          <CountryItem
            key={country.alpha3Code}
            country={country}
            isSelected={selectedCountry === country.alpha3Code}
            onClick={() => onSelectCountry(country.alpha3Code)}
          />
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
