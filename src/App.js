import React from 'react';
import { useState, useCallback } from "react";

function App() {

  const [locData, setLocData] = useState('Podunk')
  const [brewData, setBrewData] = useState([]);

  const onLocChange = useCallback((event) => {
    console.log(event.target.value);
    setLocData(event.target.value);
  }, []);

  const formSubmitted = useCallback((event) => {
    event.preventDefault();
    console.log('Form was submitted!');
    console.log(locData);
    getBreweries(locData);
  }, [locData]);

  function getBreweries(location) {
    fetchBrew();
    async function fetchBrew() {
        const res = await fetch(
            `https://api.openbrewerydb.org/breweries?by_city=${location}`
        );
        const data = await res.json();
        setBrewData(data);
        console.log(data);
    }
  };

  return (
      <div>
          <h1>Find Me Beer!</h1>
          Returns a list of breweries in a given city. Replace white space in a city name with an underscore '_'.
          <br></br>
          <br></br>
          <form onSubmit={formSubmitted}>
            <label>Enter a city:</label>
            <input
              value={locData}
              onChange={onLocChange}
            />
            <button>GO</button>
          </form>
          {/* <ul> */}
            {brewData.map((brewery) => (
              <div key={brewery.id} class="card">
                <h4>{brewery.name}</h4>
                <div class="container">
                  City: {brewery.city}
                  <br></br>
                  Website: <a href={brewery.website_url}>{brewery.website_url}</a> 
                </div>
              </div>
            ))}
          {/* </ul> */}
      </div>
  );
}

export default App;
