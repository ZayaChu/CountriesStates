import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Country = {
    code:string;
    name:string;
}
type State = {
    code:string;
    name:string;
}

const HomePage = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [countryCodes, setCountryCodes] = useState([]);
    const [chosenCoutryCode, setChosenCountryCode] = useState([]);
    useEffect(() => {
        const fetchCountries = async () => {
            try {

                const response = await axios.get('https://xc-countries-api.fly.dev/api/countries/');
                const sortedCountries = response.data.sort((a: Country, b: Country) => a.name.localeCompare(b.name));
                const codes = response.data.map((country: { code: any; }) => country.code);
                setCountries(sortedCountries);
                setCountryCodes(codes);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);
        const handleCountryChange = async (e: { target: { value: any; }; }) => {
        const countryCode = e.target.value;
        setChosenCountryCode(countryCode);
        console.log();
        try {
            if (countryCode !== "") {
                const response = await axios.get(`https://xc-countries-api.fly.dev/api/countries/${countryCode}/states/`);
                const sortedStates = response.data.sort((a: State, b: State) =>
                    a.name.localeCompare(b.name));
                setStates(sortedStates);
            } else
                setStates([]);
        } catch (error) {
            console.error(`Error fetching states for ${countryCode}:`, error);
        }

    };
    return (

        <div>
            <h1>Country and State</h1>
            <select onChange={handleCountryChange}>
                <option value="">Select a country</option>
                {countries.map(country => (
                    <option key={country.code} value={country.code}>
                        {country.name}
                    </option>
                ))}
            </select>
            &emsp;
            <select >
                <option value="" >Select a state</option>
                {states.map(state => (
                    <option key={state.code} value={state.code}>
                        {state.name}
                    </option>
                ))}
            </select>
        </div>

    );
};
    export default HomePage;
