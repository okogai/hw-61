import { useEffect, useState } from "react";
import "./App.css";
import { Country } from "./types";
import axios from "axios";

const BASE_URL = "https://restcountries.com/v2/";

const App = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  const fetchCountries = async () => {
    try {
      const response = await axios(BASE_URL + 'all?fields=alpha3Code,name');
      setCountries(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  useEffect(() => {
    void fetchCountries();
  }, []);

  return <></>;
};

export default App;
