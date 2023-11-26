import { useState } from "react";
import Weather from "./components/Weather";
import "./App.css";

import React from "react";
import Header from "./components/Header";

const App = () => {
  const [location, setLocation] = useState("Honolulu");

  return (
    <div className="weatherapp">
      <Header onInput={setLocation} />
      <Weather location={location} />
    </div>
  );
};

export default App;
