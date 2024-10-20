import React, { useEffect, useState } from "react";
import axios from "axios";
import { CountryDetailsProps, Weather } from "../../types";

interface Props {
  code: string;
  countryDetails: CountryDetailsProps | null;
  weather: Weather | null;
}

const CountryDetails: React.FC<Props> = ({ code, countryDetails, weather }) => {
  const [borderCountries, setBorderCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchBorderCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://restcountries.com/v2/alpha/${code}`,
      );

      if (response.data.borders) {
        const borderRequests = response.data.borders.map((borderCode: string) =>
          axios.get(`https://restcountries.com/v2/alpha/${borderCode}`),
        );

        const borderResponses = await Promise.all(borderRequests);
        setBorderCountries(borderResponses.map((res) => res.data.name));
      }
    } catch (error) {
      console.error("Error fetching country details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBorderCountries();
  }, [code]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {countryDetails && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{countryDetails.name}</h5>
            <p className="card-text">Capital: {countryDetails.capital}</p>
            <p className="card-text">Population: {countryDetails.population}</p>
            <img
              src={countryDetails.flag}
              alt={`${countryDetails.name} flag`}
              style={{ width: "100px" }}
            />
            <p className="card-text">
              Borders:{" "}
              {borderCountries.length > 0
                ? borderCountries.join(", ")
                : "There are no bordering countries"}
            </p>
            <hr />
            {weather && (
              <div className="weather-info mt-3">
                <p>Temperature: {weather.main.temp}°C</p>
                <p>{weather.weather[0].description}</p>
                <p>Humidity: {weather.main.humidity}%</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default CountryDetails;
