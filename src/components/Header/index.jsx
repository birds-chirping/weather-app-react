import React, { useRef } from "react";
import "./style.css";

const Header = ({ onInput }) => {
  const inputRef = useRef(null);

  function handleClick() {
    onInput(inputRef.current.value);
    inputRef.current.value = "";
  }

  return (
    <div className="weatherapp-header">
      <input ref={inputRef} className="location-input" placeholder="Enter a location"></input>
      <button className="search-button" onClick={handleClick}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>
  );
};

export default Header;
