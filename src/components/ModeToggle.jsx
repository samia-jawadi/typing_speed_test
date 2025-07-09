import React from "react";
import "./ModeToggle.css";
//toggleDarkMode is the function that turns dark mode on or off when you click the switch.
export default function ModeToggle({ darkMode, toggleDarkMode }) {
  return (
    <div className="mode-toggle">
      {/* The label wraps the checkbox to make the entire switch clickable */}
      <label className="switch">
        {/* Checkbox input to toggle dark mode */}
        {/* checked attribute is controlled by the darkMode prop */}
        {/* onChange triggers the toggleDarkMode function to switch modes */}
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />

        {/* Span styled as the slider (toggle handle) via CSS */}
        <span className="slider"></span>
      </label>

      {/* Text label displaying different emoji and text based on darkMode state */}
      <span className="label-text">
        {darkMode ? "🌙 Dark Mode" : "🌞 Light Mode"}
      </span>
    </div>
  );
}
