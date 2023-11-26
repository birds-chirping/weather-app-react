import React, { useState } from "react";
import "./style.css";
import CurrentWeather from "../CurrentWeather";

const Weather = ({ location }) => {
  return location ? (
    <div className="weatherapp-weather-container">
      <CurrentWeather location={location} />
    </div>
  ) : (
    <div>Please enter a location.</div>
  );
};

export default Weather;
