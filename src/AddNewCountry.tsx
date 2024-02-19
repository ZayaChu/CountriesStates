import React from 'react';
import axios from "axios";
import {useState} from "react";
const AddNewCountry = () => {

    const [newCountryName, setNewCountryName] = useState("");
    const [newCountryCode, setNewCountryCode] = useState("");


    const addNewCountry = async () => {

            const response = await axios.post('https://xc-countries-api.fly.dev/api/countries/', {
                code: newCountryCode,
                name: newCountryName
            });
            setNewCountryCode("");
            setNewCountryName("");
    };
    return (
        <div>
            <h1>Add New Country</h1>
            <label>Enter Country Name</label>
            <input type="text" value={newCountryName} onChange={(e) => setNewCountryName(e.target.value)}></input>
            <br></br>
            <br></br>
            <label>Enter Country Code</label>
            <input type="text" value={newCountryCode} onChange={(e) => setNewCountryCode(e.target.value)}></input>
            <button onClick={addNewCountry}>Add</button>

        </div>
    );
};

export default AddNewCountry;