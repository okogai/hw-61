import React from 'react';
import {Country} from "../../types";

interface CountryItemProps {
    country: Country;
    isSelected: boolean;
    onClick: () => void;
}

const CountryItem: React.FC<CountryItemProps> = ({country, isSelected, onClick}) => {
    return (
        <div>
            <li
                className={`list-group-item list-group-item-action ${isSelected ? 'active' : ''}`}
                onClick={() => onClick()}
                style={{cursor: 'pointer'}}
            >
                {country.name}
            </li>
        </div>
    );
};

export default CountryItem;