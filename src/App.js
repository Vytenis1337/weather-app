import React, { useState } from "react";
import axios from "axios";
import "./styles/App.scss";
import { Container } from "@mui/material";
import SearchDropdown from "./components/SearchDropdown";
import CityWeather from "./components/CityWeather";
import { fetchWeatherData } from "./services/weatherService";

function App() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    const data = await fetchWeatherData(city.lat, city.lon);
    setWeatherData(data);

    await axios.post("http://localhost:4000/log", {
      cityName: city.name,
    });
  };

  return (
    <Container className="app-container">
      <SearchDropdown onCitySelect={handleCitySelect} />
      <CityWeather cityName={selectedCity?.name} weather={weatherData} />
    </Container>
  );
}

export default App;
