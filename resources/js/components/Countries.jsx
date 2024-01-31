import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Countries({ onSelectCountry }) {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/get-countries');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries', error);
            }
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (event) => {
        onSelectCountry(event.target.value);
    };

    return (
        <select id="country" className='form-select mt-2' onChange={handleCountryChange}>
            <option value="">Seçiniz</option>
            {countries.map(country => (
                <option key={country.id} value={country.iso_code}>
                    {country.name}
                </option>
            ))}
        </select>
    );
}

export default Countries;