import { useEffect, useState } from "react";
import "./Display.css";
const Display = () => {
  const [countries, setCountrys] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const countryApi = "https://crio-location-selector.onrender.com/countries";
  const stateApi = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
  const cityApi = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;
  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(countryApi);
        const jsonData = await response.json();
        setCountrys(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCountry();
  }, []);

  useEffect(() => {
    const fetchState = async () => {
      try {
        const response = await fetch(stateApi);
        const jsonData = await response.json();
        setStates(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchState();
    setSelectedState("");
    setSelectedCity("");
  }, [selectedCountry]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch(cityApi);
        const jsonData = await response.json();
        setCities(jsonData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCity();
    setSelectedCity("");
  }, [selectedState]);

  return (
    <>
      <div class="container">
        <div>
          <h2>Select Location</h2>
          <br />

          <select
            name="Country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option value="" disabled>
              Select Country
            </option>
            {countries.map((ele, idx) => {
              return (
                <option value={ele} key={idx}>
                  {ele}
                </option>
              );
            })}
          </select>
          <select
            name="Country"
            value={selectedState}
            disabled={!selectedCountry}
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((ele, idx) => {
              return (
                <option value={ele} key={idx}>
                  {ele}
                </option>
              );
            })}
          </select>
          <select
            name="Country"
            value={selectedCity}
            disabled={!selectedState}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="" disabled>
              Select City
            </option>
            {cities.map((ele, idx) => {
              return (
                <option value={ele} key={idx}>
                  {ele}
                </option>
              );
            })}
          </select>
          {selectedCity ? (
            <p>
              You selected <strong>{selectedCity}</strong>, {selectedState},{" "}
              {selectedCountry}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Display;
