import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Country = {
    id: number;
    code: string;
    name: string;
};
const AddNewState = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [chosenCountryId, setChosenCountryId] = useState('');
    const [newStateName, setNewStateName] = useState('');
    const [newStateCode, setNewStateCode] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://xc-countries-api.fly.dev/api/countries/');
                const sortedCountries = response.data.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
                const codes = response.data.map((country: { code: any; }) => country.code);
                setCountries(sortedCountries);
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleCountryChange = (e:{target:{value: any}}) => {
        const countryId = e.target.value;
        setChosenCountryId(countryId);
    };

    const addNewState = async () => {
                const response = await axios.post('https://xc-countries-api.fly.dev/api/states/', {
                    code: newStateCode,
                    name: newStateName,
                    countryId: chosenCountryId
                });
                setNewStateName('');
                setNewStateCode('');

    };

    return (
        <div>

            <h1>Add New State</h1>
            <label>Select Country</label>
            <select onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country.id} value={country.id}>
                        {country.name}
                    </option>
                ))}
            </select>
            &emsp;
            <div className = "input-container">
                <p>
            <label >Enter State Code</label>
            <input type="text" value={newStateCode} onChange={(e) => setNewStateCode(e.target.value)}></input>
            <br></br>
            <label>Enter State Name</label>
            <input type="text" value={newStateName} onChange={(e) => setNewStateName(e.target.value)}></input>

                </p>
            </div>
            <button onClick={addNewState}>Add State</button>
        </div>
    );
};

export default AddNewState;
