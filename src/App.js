import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCoutries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setcities] = useState([]);
  const [countryselect, setCountrySelect] = useState("");
  const [selectedState, setSelectedstate] = useState("");
  const [selectedCity, setSelectedcity] = useState("");

  const url = `https://crio-location-selector.onrender.com`;

  const ApiCallforCoutries = async () => {
    try {
      const response = await axios.get(`${url}/countries`);

      setCoutries(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    const loader = async () => {
      await ApiCallforCoutries();
    };
    loader();
  }, []);

  const handlestate = async (value) => {
    if (value === "") {
      return;
    }
    setCountrySelect(value);
    try {
      const response = await axios(`${url}/country=${value}/states`);
      console.log(response.data);
      setStates(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const handlecites = async (value) => {
    if (value === "") {
      return;
    }
    setSelectedstate(value);

    try {
      const response = await axios(
        `${url}/country=${countryselect}/state=${value}/cities`
      );
      console.log(response.data);
      setcities(response.data);
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleSelect = (e) => {
    setCountrySelect(e.target.value);
    if (e.target.value === "") {
      return;
    } else {
      handlestate(e.target.value);
    }
  };
  const showDetails = (value) => {
    setSelectedcity(value);
  };

  return (
    <div className="App">
      <h1>Select Location</h1>

      <select
        id="countries"
        name="countries"
        onChange={(e) => handleSelect(e)}
        style={{ marginRight: "1rem", height: "2rem" }}
      >
        <option key="0" value="" selected>
          Select Countries
        </option>
        {countries.map((item, index = 1) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        id="state"
        name="state"
        style={{ marginRight: "1rem", height: "2rem" }}
        onChange={(e) => handlecites(e.target.value)}
        disabled={!countryselect}
      >
        <option key="0" value="" selected >
          Select State
        </option>
        {states.map((item, index = 1) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <select
        id="city"
        name="city"
        style={{ marginRight: "1rem", height: "2rem" }}
        onChange={(e) => showDetails(e.target.value)}
        disabled={!selectedState}
      >
        <option key="0" value="selected option" selected>
          Select City
        </option>
        {cities.map((item, index = 1) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <br />
      <br />
      {selectedCity !== "" && (
        <div>
          You selected{" "}
          <span style={{ fontSize: "20px", fontWeight: "bold" }}>
            {selectedCity}
          </span>
          ,<span style={{ color: "grey" }}> {selectedState}</span>,
          <span style={{ color: "grey" }}> {countryselect}</span>
        </div>
      )}
    </div>
  );
}

export default App;
