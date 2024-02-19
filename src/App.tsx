import React, { useState, useEffect } from 'react';
import AddNewCountry from "./AddNewCountry";
import {BrowserRouter as Router, Route, Link, Routes, Outlet} from 'react-router-dom';
import HomePage from "./HomePage";
import AddNewState from "./AddNewState";

function App(){

  HomePage();
  return (
<Router>

  <div>
    <Link to="/">Home</Link>
    <br></br>
    <Link to="/add-new-country">Add Country</Link>
    <br></br>
    <Link to="/add-new-state">Add State</Link>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/add-new-country" element={<AddNewCountry/>}/>
      <Route path="/add-new-state" element={<AddNewState/>}/>
    </Routes>
  </div>
</Router>
  )
};
export default App;
