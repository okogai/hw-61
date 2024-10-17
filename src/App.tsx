import { useEffect, useState } from "react";
import "./App.css";
import {Country, CountryDetails} from "./types";
import axios from "axios";
import CountryList from "./components/CountryInfo/CountryList.tsx";

const BASE_URL = "https://restcountries.com/v2/";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryDetails, setCountryDetails] = useState<CountryDetails | null>(null);

  const fetchCountries = async () => {
    try {
      const response = await axios(BASE_URL + 'all?fields=alpha3Code,name');
      setCountries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchCountryDetails = async (code: string) => {
    try {
      const response = await axios(BASE_URL + 'alpha/' + code);
      setCountryDetails(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  };

  const handleSelectCountry = (code: string) => {
    setSelectedCountry(code);
    void fetchCountryDetails(code);
  };

  useEffect(() => {
    void fetchCountries();
  }, []);

  return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h4>Country List</h4>
            <CountryList
                countries={countries}
                selectedCountry={selectedCountry}
                onSelectCountry={handleSelectCountry}
            />
          </div>
          <div className="col-md-8">
            {countryDetails ? (
                <p>{countryDetails.capital}</p>
            ) : (
                <p>Select a country to see details</p>
            )}
          </div>
        </div>
      </div>
  );
};

export default App;
