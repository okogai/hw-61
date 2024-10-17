import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {CountryDetailsProps} from "../../types";

interface Props {
    code: string;
    countryDetails: CountryDetailsProps;
}

const CountryDetails: React.FC<Props> = ({ code, countryDetails }) => {
    const [borderCountries, setBorderCountries] = useState<any[]>([]);

    const fetchBorderCountries = async () => {
        try {
            const response = await axios.get(`https://restcountries.com/v2/alpha/${code}`);
            if (response.data.borders) {
                const borderRequests = response.data.borders.map((borderCode: string) =>
                    axios.get(`https://restcountries.com/v2/alpha/${borderCode}`)
                );

                const borderResponses = await Promise.all(borderRequests);
                setBorderCountries(borderResponses.map(res => res.data.name));
            }
        } catch (error) {
            console.error("Error fetching border countries:", error);
        }
    };

    console.log('border', borderCountries);

    useEffect(() => {
    void fetchBorderCountries();
    }, [code]);

    if (!countryDetails) {
        return <p>Загрузка...</p>;
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{countryDetails.name}</h5>
                <p className="card-text">Столица: {countryDetails.capital}</p>
                <p className="card-text">Население: {countryDetails.population}</p>
                <img src={countryDetails.flag} alt={`${countryDetails.name} flag`} style={{ width: '100px' }} />
                <p className="card-text">Граничит с: {borderCountries.length > 0 ? borderCountries.join(', ') : 'Нет граничащих стран'}</p>
            </div>
        </div>
    );
};

export default CountryDetails;
