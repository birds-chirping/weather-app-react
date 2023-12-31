import React, { useState, useEffect } from "react";
import { WeatherAPI } from "../../api/weather";
import "./style.css";

const Forecast = ({ location }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apidata = await WeatherAPI.getForecast(location);
      setData(getForecastForEachDay(apidata));
    };
    fetchData();
  }, []);

  return data ? (
    data.cod === "200" ? (
      <div className="forecast-container">
        {data.days.map((day) => (
          <DayForecast key={`${day[0].dayName}`} day={day} />
        ))}
      </div>
    ) : (
      <>{data.message}</>
    )
  ) : (
    <>Loading...</>
  );
};

const DayForecast = ({ day }) => {
  return (
    <div className="day-forecast-container">
      <div className="day-forecast-title">{day[0].dayName}</div>
      <div className="day-forecast-content">
        {day.map((hour) => (
          <HourCard key={`${hour.dayName}+${hour.time}`} hour={hour} />
        ))}
      </div>
    </div>
  );
};

const HourCard = ({ hour }) => {
  return (
    <div className="hour-forecast">
      <div className="temperature">{hour.temperature}°</div>
      <div className="icon-wrapper">
        <img src={hour.icon} />
      </div>
      <div className="description">{hour.description}</div>
      <div className="time">{hour.time}</div>
    </div>
  );
};

function getForecastForEachDay(data) {
  if (data.cod != "200") return data;

  let lastDayName = null;
  let days = [];
  let hours = [];

  data.list.forEach((weatherByTime) => {
    const today = new Date();
    var userTimezoneOffset = today.getTimezoneOffset() * 60;
    const date = new Date((weatherByTime.dt + userTimezoneOffset + data.city.timezone) * 1000);

    const dayName =
      today.toLocaleDateString() === date.toLocaleDateString()
        ? "Today"
        : date.toLocaleDateString("en-UK", { weekday: "long" });

    const time = date.toLocaleTimeString("en-UK", { hour: "2-digit", minute: "2-digit" });

    if (lastDayName != dayName) {
      if (hours.length > 0) {
        days.push(hours);
        hours = [];
      }

      lastDayName = dayName;
    }

    hours.push({
      cod: data.cod,
      dayName: dayName,
      temperature: Math.round(weatherByTime.main.temp),
      icon: WeatherAPI.getIcon(weatherByTime.weather[0].icon),
      description: weatherByTime.weather[0].description,
      time: time,
    });
  });

  days.push(hours);

  return { cod: data.cod, days: days };
}

export default Forecast;
