import React, { useRef } from "react";
import "./style.css";

const Header = ({ onInput }) => {
  const inputRef = useRef(null);

  function handleClick() {
    searchLocation();
  }

  function handleKeyUp(e) {
    if (e.key === "Enter") searchLocation();
  }

  function searchLocation() {
    onInput(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <div className="weatherapp-header">
      <input ref={inputRef} onKeyUp={handleKeyUp} className="location-input" placeholder="Enter a location" />
      <button className="search-button" onClick={handleClick}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default Header;
