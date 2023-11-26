import React from "react";
import { WeatherAPI } from "../../api/weather";
import Mappy from "../Map";
import Forecast from "../Forecast";
import "./style.css";
import { useState, useEffect } from "react";

const CurrentWeather = ({ location }) => {
  const [data, setData] = useState(null);
  const [showForecast, setShowForecast] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await WeatherAPI.getCurrentWeatherByLocation(location);
      setData(data);
    };
    fetchData();

    return () => {
      setShowForecast(false);
    };
  }, [location]);

  function handleClick() {
    setShowForecast(true);
  }

  return data ? (
    data.cod === 200 ? (
      <>
        <div className="current-weather-card">
          <div className="title">{data.name}</div>

          <Mappy location={data.name} />

          <div className="weather-info">
            <div className="left">
              <img className="icon" src={WeatherAPI.getIcon(data.weather[0].icon, "large")} />
              <div className="weather-state">
                <div className="temperature">{Math.round(data.main.temp)}°</div>
                <div className="description">{data.weather[0].description}</div>
              </div>
            </div>

            <div className="right">
              <div className="low-high">
                <div className="extra-info">
                  <div>
                    <span className="value">{Math.round(data.main.temp_min)}°</span>
                  </div>
                  <div>Low</div>
                </div>
                <div className="extra-info">
                  <div>
                    <span className="value">{Math.round(data.main.temp_max)}°</span>
                  </div>
                  <div>High</div>
                </div>
              </div>
              <div className="other-info">
                <div className="extra-info">
                  <div>
                    <span className="value">{data.main.humidity}</span> %
                  </div>
                  <div>Humidity</div>
                </div>
                <div className="extra-info">
                  <div>
                    <span className="value">{data.main.pressure}</span> hPa
                  </div>
                  <div>Pressure</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <button onClick={handleClick} className="forecast-btn">
          5-Day Weather Forecast
        </button>
        {showForecast && <Forecast location={data.name} />}
      </>
    ) : (
      <div>{data.message}</div>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default CurrentWeather;
