import { useEffect, useState } from "react";
import "./App.css";
import { Country, CountryDetailsProps, Weather } from "./types";
import axios from "axios";
import CountryList from "./components/CountryInfo/CountryList.tsx";
import CountryDetails from "./components/CountryInfo/CountryDetails.tsx";

const BASE_URL = "https://restcountries.com/v2/";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const WEATHER_KEY = "&appid=04d6b9f9cd1cb64514a050fa11467ff5";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryDetails, setCountryDetails] =
    useState<CountryDetailsProps | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [weather, setWeather] = useState<Weather | null>(null);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios(BASE_URL + "all?fields=alpha3Code,name");
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountryDetails = async (code: string) => {
    try {
      const response = await axios(BASE_URL + "alpha/" + code);
      setCountryDetails(response.data);
      if (response.data.capital) {
        await getWeather(response.data.capital);
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
    }
  };

  const getWeather = async (capital: string) => {
    try {
      const response = await axios.get(
        `${WEATHER_URL}${capital}${WEATHER_KEY}`,
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeather(null);
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
          {loading ? (
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <CountryList
              countries={countries}
              selectedCountry={selectedCountry}
              onSelectCountry={handleSelectCountry}
            />
          )}
        </div>
        <div className="col-md-8">
          <h2>Country Details</h2>
          {selectedCountry ? (
            <CountryDetails
              code={selectedCountry}
              countryDetails={countryDetails}
              weather={weather}
            />
          ) : (
            <p>Please select a country</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
