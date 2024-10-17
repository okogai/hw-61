import React from 'react';

interface CountryItemProps {
    name: string;
    alpha3Code: string;
    isSelected: boolean;
    onSelect: (code: string) => void;
}

const CountryItem: React.FC<CountryItemProps> = ({name, alpha3Code, onSelect, isSelected}) => {
    return (
        <div>
            <li
                className={`list-group-item list-group-item-action ${isSelected ? 'active' : ''}`}
                onClick={() => onSelect(alpha3Code)}
                style={{cursor: 'pointer'}}
            >
                {name}
            </li>
        </div>
    );
};

export default CountryItem;